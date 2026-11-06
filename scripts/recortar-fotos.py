"""Recorta o fundo das fotos dos doces e exporta WebP com transparência.

Uso (a partir da pasta pessoal/, com o venv do rembg):
  .venv-rembg/Scripts/python -I doces-mantiqueira/scripts/recortar-fotos.py [nomes...]
Sem nomes, refaz todas as fotos; com nomes, só essas.

Duas máscaras por foto:
- BiRefNet (rembg) acha os doces, com borda fina no açúcar cristal;
- SAM (rembg), guiado por uma caixa em volta do prato, acha o prato inteiro.
A união das duas dá o prato com os doces. Sai também a versão só com os
doces (sufixo -doces), para as fotos em que o prato está cortado pelo
enquadramento. A prancha de conferência fica em design/recortes/.
"""

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
from rembg import new_session
import sys

from scipy import ndimage
from scipy.interpolate import PchipInterpolator
from skimage.morphology import convex_hull_image

RAIZ = Path(__file__).resolve().parents[1]
ORIGEM = RAIZ / "src" / "assets" / "fotos" / "produtos"
DESTINO = RAIZ / "src" / "assets" / "recortes"
PRANCHA = RAIZ / "design" / "recortes"
CACHE = RAIZ / ".cache-recortes"  # máscaras cruas, para não rodar os modelos de novo

# Caixa do prato/bandeja em frações da foto (x1, y1, x2, y2).
# None = prato cortado pelo enquadramento: só a versão com os doces.
PRATOS = {
    "pacoca": (0.0, 0.03, 1.0, 0.9),
    "pacoca-pacote": (0.15, 0.3, 0.8, 0.87),
    "pacoca-tigela": (0.0, 0.17, 1.0, 1.0),
    "cajuzinho": (0.0, 0.27, 1.0, 0.86),
    "figo": (0.0, 0.22, 0.98, 0.82),
    "banana": (0.07, 0.18, 0.93, 0.8),
    "batata-roxa": (0.27, 0.47, 0.93, 0.8),
    "batata": (0.06, 0.6, 0.94, 1.0),
    "abobora": (0.09, 0.07, 0.93, 1.0),
    "doce-de-leite": None,
    "figo-prato": None,
    "sortida": (0.08, 0.17, 0.92, 0.79),
    "sortida-prato": None,  # o SAM pega só parte do prato; a versão só com os doces fica melhor
    # Bandejinhas brancas, no mesmo padrão da banana, da batata e da sortida:
    # só a bandeja sai no recorte, sem os pratos coloridos de baixo.
    "cajuzinho-bandejinha": (0.15, 0.43, 0.83, 0.86),
    "figo-bandejinha": (0.26, 0.318, 0.735, 0.745),
    "abobora-bandejinha": (0.145, 0.205, 0.855, 0.805),
    "batata-roxa-bandejinha": (0.16, 0.30, 0.85, 0.80),
    "doce-de-leite-bandejinha": (0.11, 0.39, 0.90, 0.86),
}

# Nestas, só com a caixa o SAM pega os doces e deixa a bandeja de fora.
# Pontos na borda branca da bandeja (x, y em frações da foto) resolvem.
PONTOS_PRATO = {
    "figo-bandejinha": [(0.5, 0.715), (0.29, 0.55), (0.705, 0.55), (0.5, 0.5)],
    "abobora-bandejinha": [(0.5, 0.775), (0.175, 0.55), (0.825, 0.55), (0.5, 0.5)],
}

# Recipientes com alça não são convexos: o fecho puxaria o prato de baixo.
NAO_CONVEXOS = {"pacoca-tigela"}

# A tigela da paçoca encosta nas duas bordas da foto, que cortam as alças pela
# metade: sobravam dois tocos vermelhos nas laterais. Entre o topo da borda e a
# base das alças, o contorno passa a seguir a parede da tigela. À esquerda, a
# parede segue até embaixo para tirar os amendoins que a borda da foto também
# cortou ao meio; os amendoins inteiros da frente ficam. Pontos (y, x) em
# pixels do recorte de referência (base), convertidos para a caixa do recorte.
ALCAS = {
    "pacoca-tigela": {
        "base": (900, 890),
        "esquerda": [(230, 135), (244, 112), (260, 85), (280, 63), (300, 50), (330, 40), (356, 39),
                     (400, 48), (430, 58), (452, 67), (468, 85), (495, 94), (525, 106), (560, 115),
                     (600, 125), (630, 133), (650, 139), (668, 150)],
        "direita": [(230, 815), (244, 824), (260, 835), (280, 846), (300, 853), (330, 862), (356, 862),
                    (400, 846), (430, 832), (452, 820), (468, 815)],
    },
}

LADO_MAX = 900
CREME = (251, 244, 228)
TACHO = (122, 10, 18)


def em_cache(nome: str, gerar) -> np.ndarray:
    arquivo = CACHE / f"{nome}.png"
    if not arquivo.exists():
        gerar().save(arquivo)
    return np.asarray(Image.open(arquivo), dtype=np.float32) / 255


def mascara_doces(sessao, foto: Image.Image, nome: str) -> np.ndarray:
    return em_cache(f"{nome}-birefnet", lambda: sessao().predict(foto)[0])


def mascara_prato(sessao, foto: Image.Image, caixa, nome: str) -> np.ndarray:
    w, h = foto.size
    x1, y1, x2, y2 = caixa[0] * w, caixa[1] * h, caixa[2] * w, caixa[3] * h
    if nome in PONTOS_PRATO:
        pontos = [[x * w, y * h] for x, y in PONTOS_PRATO[nome]]
    else:
        pontos = [[(x1 + x2) / 2, (y1 + y2) / 2]]
    prompt = [{"type": "rectangle", "data": [x1, y1, x2, y2], "label": 1}]
    prompt += [{"type": "point", "data": ponto, "label": 1} for ponto in pontos]
    return em_cache(f"{nome}-sam", lambda: sessao().predict(foto, sam_prompt=prompt)[0])


def pixels_claros(foto: Image.Image) -> np.ndarray:
    hsv = np.asarray(foto.convert("HSV"), dtype=np.float32) / 255
    return (hsv[..., 1] < 0.28) & (hsv[..., 2] > 0.5)


def maior_objeto(binaria: np.ndarray) -> np.ndarray:
    rotulos, n = ndimage.label(binaria)
    if n <= 1:
        return binaria
    tamanhos = ndimage.sum(binaria, rotulos, range(1, n + 1))
    return rotulos == (np.argmax(tamanhos) + 1)


def unir(foto: Image.Image, doces: np.ndarray, prato: np.ndarray, caixa, convexo: bool = True,
         todos_os_pedacos: bool = False) -> np.ndarray:
    """Prato + doces num objeto só, sem furos nem fragmentos soltos, com borda suave.

    Prato e bandeja são convexos: o fecho convexo da máscara do SAM tapa as
    mordidas na borda. Se o prato é claro (branco ou creme), do fecho só
    entram os pixels claros, para não puxar o prato colorido de baixo.
    Dos doces, ficam os pedaços que estão na maior parte dentro do contorno do prato.
    """
    h, w = doces.shape
    dentro = np.zeros_like(doces, dtype=bool)
    dentro[int(caixa[1] * h):int(np.ceil(caixa[3] * h)), int(caixa[0] * w):int(np.ceil(caixa[2] * w))] = True
    sam_bin = (prato > 0.5) & dentro
    if not todos_os_pedacos:
        sam_bin = maior_objeto(sam_bin)
    if convexo:
        fecho = convex_hull_image(sam_bin) & dentro
    else:
        fecho = ndimage.binary_fill_holes(ndimage.binary_closing(sam_bin, iterations=4)) & dentro
    claro = pixels_claros(foto)
    if claro[sam_bin].mean() > 0.5:
        prato_bin = ndimage.binary_opening(claro & fecho, iterations=2)
        prato_bin = maior_objeto(ndimage.binary_closing(prato_bin, iterations=4) & fecho)
    else:
        prato_bin = fecho
    cheio = ndimage.binary_fill_holes(prato_bin)
    rotulos, n = ndimage.label(doces > 0.5)
    sobre_prato = ndimage.mean(fecho, rotulos, range(1, n + 1)) if n else []
    doces_bin = np.isin(rotulos, [i + 1 for i, f in enumerate(sobre_prato) if f > 0.5])
    doces = np.where(ndimage.binary_dilation(doces_bin, iterations=3), doces, 0)
    solido = ndimage.binary_fill_holes(cheio | doces_bin)
    suave = ndimage.gaussian_filter(solido.astype(np.float32), 1.0)
    return np.maximum(np.where(solido, suave, 0), doces)


def aparar_alcas(alfa: np.ndarray, contorno: dict) -> np.ndarray:
    """Apaga o que passa da parede da tigela nas linhas das alças, com borda suave."""
    ys, xs = np.where(alfa > 8 / 255)
    x0, y0 = xs.min(), ys.min()
    bw, bh = contorno["base"]
    sx, sy = (xs.max() + 1 - x0) / bw, (ys.max() + 1 - y0) / bh
    alfa = alfa.copy()
    coluna = np.arange(alfa.shape[1], dtype=np.float32)
    # Cada lado vale só nas linhas que os seus pontos cobrem.
    for lado, sinal in (("esquerda", 1), ("direita", -1)):
        py = np.array([y0 + y * sy for y, _ in contorno[lado]])
        px = np.array([x0 + x * sx for _, x in contorno[lado]])
        parede = PchipInterpolator(py, px)
        for y in range(int(np.ceil(py.min())), int(py.max()) + 1):
            alfa[y] *= np.clip(sinal * (coluna - parede(y)) + 0.5, 0, 1)
    # O corte deixa lascas soltas dos amendoins de fora: some tudo que ficou separado e pequeno.
    rotulos, n = ndimage.label(alfa > 0.05)
    if n > 1:
        tamanhos = ndimage.sum(np.ones_like(alfa), rotulos, range(1, n + 1))
        lascas = np.isin(rotulos, [i + 1 for i, t in enumerate(tamanhos) if t < 0.002 * alfa.size])
        alfa[ndimage.binary_dilation(lascas, iterations=2)] = 0
    return alfa


def exportar(foto: Image.Image, alfa: np.ndarray, nome: str) -> Image.Image:
    if nome in ALCAS:
        alfa = aparar_alcas(alfa, ALCAS[nome])
    rgba = foto.convert("RGBA")
    rgba.putalpha(Image.fromarray((np.clip(alfa, 0, 1) * 255).astype(np.uint8)))
    caixa = rgba.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    if caixa:
        rgba = rgba.crop(caixa)
    rgba.thumbnail((LADO_MAX, LADO_MAX), Image.LANCZOS)
    rgba.save(DESTINO / f"{nome}.webp", "WEBP", quality=82, method=6)
    return rgba


def sobre(fundo, recorte: Image.Image, t: int) -> Image.Image:
    quadro = Image.new("RGB", (t, t), fundo)
    copia = recorte.copy()
    copia.thumbnail((t - 20, t - 20), Image.LANCZOS)
    quadro.paste(copia, ((t - copia.width) // 2, (t - copia.height) // 2), copia)
    return quadro


def main() -> None:
    DESTINO.mkdir(parents=True, exist_ok=True)
    PRANCHA.mkdir(parents=True, exist_ok=True)
    CACHE.mkdir(exist_ok=True)
    sessoes = {}
    birefnet = lambda: sessoes.setdefault("b", new_session("birefnet-general"))
    sam = lambda: sessoes.setdefault("s", new_session("sam"))
    fonte = ImageFont.load_default(18)

    T = 380
    linhas = []
    escolhidas = sys.argv[1:]  # nomes opcionais: refaz só essas fotos
    for nome, caixa in PRATOS.items():
        if escolhidas and nome not in escolhidas:
            continue
        foto = Image.open(ORIGEM / f"{nome}.jpg").convert("RGB")
        doces = mascara_doces(birefnet, foto, nome)
        so_doces = exportar(foto, doces, f"{nome}-doces")
        quadros = [foto, so_doces]
        if caixa:
            mascara = mascara_prato(sam, foto, caixa, nome)
            # Com os pontos na borda, o SAM devolve a bandeja em pedaços: vale o fecho de todos.
            prato = exportar(foto, unir(foto, doces, mascara, caixa, nome not in NAO_CONVEXOS, nome in PONTOS_PRATO), nome)
            quadros += [prato, prato]
        linha = Image.new("RGB", (T * 4 + 60, T + 34), (255, 255, 255))
        for i, q in enumerate(quadros):
            fundo = TACHO if i == 3 else CREME
            if i == 0:
                q = q.copy(); q.thumbnail((T, T)); img = Image.new("RGB", (T, T), "white"); img.paste(q, ((T - q.width) // 2, 0))
            else:
                img = sobre(fundo, q, T)
            linha.paste(img, (i * (T + 20), 30))
        rotulo = f"{nome}: original | só doces | prato inteiro (creme) | prato inteiro (tacho)" if caixa else f"{nome}: original | só doces (prato cortado no enquadramento)"
        ImageDraw.Draw(linha).text((4, 4), rotulo, fill=(0, 0, 0), font=fonte)
        linha.save(PRANCHA / f"{nome}.jpg", quality=86)
        linhas.append(linha)
        print(nome, flush=True)

    w, h = linhas[0].size
    geral = Image.new("RGB", (w, h * len(linhas)), (255, 255, 255))
    for i, linha in enumerate(linhas):
        geral.paste(linha, (0, i * h))
    geral.save(PRANCHA / ("_prancha-parcial.jpg" if escolhidas else "_prancha-recortes.jpg"), quality=80)


if __name__ == "__main__":
    main()
