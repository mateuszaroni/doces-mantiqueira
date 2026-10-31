"""Recorta o fundo das fotos dos doces e exporta WebP com transparência.

Uso (a partir da pasta pessoal/, com o venv do rembg):
  .venv-rembg/Scripts/python -I doces-mantiqueira/scripts/recortar-fotos.py

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
from scipy import ndimage
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
}

# Recipientes com alça não são convexos: o fecho puxaria o prato de baixo.
NAO_CONVEXOS = {"pacoca-tigela"}

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
    prompt = [
        {"type": "rectangle", "data": [x1, y1, x2, y2], "label": 1},
        {"type": "point", "data": [(x1 + x2) / 2, (y1 + y2) / 2], "label": 1},
    ]
    return em_cache(f"{nome}-sam", lambda: sessao().predict(foto, sam_prompt=prompt)[0])


def maior_objeto(binaria: np.ndarray) -> np.ndarray:
    rotulos, n = ndimage.label(binaria)
    if n <= 1:
        return binaria
    tamanhos = ndimage.sum(binaria, rotulos, range(1, n + 1))
    return rotulos == (np.argmax(tamanhos) + 1)


def unir(foto: Image.Image, doces: np.ndarray, prato: np.ndarray, caixa, convexo: bool = True) -> np.ndarray:
    """Prato + doces num objeto só, sem furos nem fragmentos soltos, com borda suave.

    Prato e bandeja são convexos: o fecho convexo da máscara do SAM tapa as
    mordidas na borda. Se o prato é claro (branco ou creme), do fecho só
    entram os pixels claros, para não puxar o prato colorido de baixo.
    Dos doces, ficam os pedaços que estão na maior parte dentro do contorno do prato.
    """
    h, w = doces.shape
    dentro = np.zeros_like(doces, dtype=bool)
    dentro[int(caixa[1] * h):int(np.ceil(caixa[3] * h)), int(caixa[0] * w):int(np.ceil(caixa[2] * w))] = True
    sam_bin = maior_objeto((prato > 0.5) & dentro)
    if convexo:
        fecho = convex_hull_image(sam_bin) & dentro
    else:
        fecho = ndimage.binary_fill_holes(ndimage.binary_closing(sam_bin, iterations=4)) & dentro
    hsv = np.asarray(foto.convert("HSV"), dtype=np.float32) / 255
    claro = (hsv[..., 1] < 0.28) & (hsv[..., 2] > 0.5)
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


def exportar(foto: Image.Image, alfa: np.ndarray, nome: str) -> Image.Image:
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
    for nome, caixa in PRATOS.items():
        foto = Image.open(ORIGEM / f"{nome}.jpg").convert("RGB")
        doces = mascara_doces(birefnet, foto, nome)
        so_doces = exportar(foto, doces, f"{nome}-doces")
        quadros = [foto, so_doces]
        if caixa:
            prato = exportar(foto, unir(foto, doces, mascara_prato(sam, foto, caixa, nome), caixa, nome not in NAO_CONVEXOS), nome)
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
    geral.save(PRANCHA / "_prancha-recortes.jpg", quality=80)


if __name__ == "__main__":
    main()
