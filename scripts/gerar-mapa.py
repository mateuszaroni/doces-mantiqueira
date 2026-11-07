"""Gera o mapa fixo de "Onde estamos": uma imagem, sem iframe e sem cookies.

Uso (a partir da pasta pessoal/, com o venv do rembg, que já tem o Pillow):
  .venv-rembg/Scripts/python -I doces-mantiqueira/scripts/gerar-mapa.py

Baixa uma vez os blocos do OpenStreetMap em volta da loja (ficam em
.cache-mapa/, para não pedir de novo), pinta nas cores do site e marca a
loja com um pino vermelho. A atribuição "© OpenStreetMap" é obrigatória e
fica na legenda, no componente OndeEstamos.
"""

import math
import time
import urllib.request
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parents[1]
CACHE = RAIZ / ".cache-mapa"
PASTA = RAIZ / "src" / "assets" / "mapa"

# Rua São Benedito, 8: a numeração começa na Av. Conselheiro Rodrigues Alves,
# então o 8 fica no começo da rua, junto da avenida. Conferir com a família.
LOJA = (-22.60475, -45.18626)
ZOOM = 17
# Dois recortes na mesma escala: o largo para o desktop e um mais fechado para o
# celular, onde o largo encolheria até os nomes das ruas ficarem ilegíveis.
RECORTES = {"mapa-piquete": (1120, 760), "mapa-piquete-celular": (420, 340)}
MAIOR = max(RECORTES.values())

CAFE = np.array((43, 26, 18), dtype=np.float32)
CREME = np.array((251, 244, 228), dtype=np.float32)
VERMELHO = (193, 4, 19)
TACHO = (122, 10, 18)


def bloco_xy(lat: float, lon: float) -> tuple[float, float]:
    n = 2**ZOOM
    x = (lon + 180) / 360 * n
    y = (1 - math.asinh(math.tan(math.radians(lat))) / math.pi) / 2 * n
    return x, y


def bloco(x: int, y: int) -> Image.Image:
    arquivo = CACHE / f"{ZOOM}-{x}-{y}.png"
    if not arquivo.exists():
        pedido = urllib.request.Request(
            f"https://tile.openstreetmap.org/{ZOOM}/{x}/{y}.png",
            headers={"User-Agent": "doces-mantiqueira-site-build/1.0 (mapa estatico unico)"},
        )
        arquivo.write_bytes(urllib.request.urlopen(pedido, timeout=30).read())
        time.sleep(0.3)  # política de uso dos blocos do OSM: sem rajada
    return Image.open(arquivo).convert("RGB")


def mosaico() -> tuple[Image.Image, float, float]:
    """Junta os blocos em volta da loja e devolve a posição do pino no mosaico."""
    cx, cy = bloco_xy(*LOJA)
    meia_x, meia_y = math.ceil(MAIOR[0] / 512) + 1, math.ceil(MAIOR[1] / 512) + 1
    x0, y0 = int(cx) - meia_x, int(cy) - meia_y
    img = Image.new("RGB", ((2 * meia_x + 1) * 256, (2 * meia_y + 1) * 256))
    for i in range(2 * meia_x + 1):
        for j in range(2 * meia_y + 1):
            img.paste(bloco(x0 + i, y0 + j), (256 * i, 256 * j))
    return img, (cx - x0) * 256, (cy - y0) * 256


def pintar(img: Image.Image) -> Image.Image:
    """Duotone café → creme. O fundo do OSM fica bege, as ruas ficam creme e os nomes, café."""
    cinza = np.asarray(img.convert("L"), dtype=np.float32) / 255
    # Estica o contraste: o fundo (≈0.94) desce e as ruas (brancas) ficam no topo.
    t = np.clip((cinza - 0.35) / (1.0 - 0.35), 0, 1) ** 1.6
    t = 0.12 + 0.88 * t
    cores = CAFE + (CREME - CAFE) * t[..., None]
    return Image.fromarray(cores.astype(np.uint8))


def pino(img: Image.Image, x: float, y: float) -> None:
    """Gota vermelha com a ponta no endereço, miolo creme e sombra macia no chão."""
    escala = 2  # desenha grande e reduz, para a borda sair lisa
    w, h = 64 * escala, 88 * escala
    camada = Image.new("RGBA", (w, h + 20 * escala), (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    r = 30 * escala
    cx, cy = w / 2, r + 2 * escala
    ponta = (cx, h)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=VERMELHO)
    d.polygon([(cx - r * 0.82, cy + r * 0.58), (cx + r * 0.82, cy + r * 0.58), ponta], fill=VERMELHO)
    d.ellipse([cx - r * 0.42, cy - r * 0.42, cx + r * 0.42, cy + r * 0.42], fill=tuple(CREME.astype(int)))
    camada = camada.resize((camada.width // escala, camada.height // escala), Image.LANCZOS)

    sombra = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sombra).ellipse([x - 16, y - 5, x + 16, y + 5], fill=(*TACHO, 110))
    sombra = sombra.filter(ImageFilter.GaussianBlur(4))
    base = img.convert("RGBA")
    base.alpha_composite(sombra)
    base.alpha_composite(camada, (int(round(x - camada.width / 2)), int(round(y - h / escala))))
    img.paste(base.convert("RGB"))


def main() -> None:
    CACHE.mkdir(exist_ok=True)
    PASTA.mkdir(parents=True, exist_ok=True)
    todo, px, py = mosaico()
    for nome, (largura, altura) in RECORTES.items():
        # O pino fica um pouco abaixo do centro: a gota sobe e precisa de espaço em cima.
        esquerda, topo = int(px - largura / 2), int(py - altura * 0.58)
        img = pintar(todo.crop((esquerda, topo, esquerda + largura, topo + altura)))
        pino(img, px - esquerda, py - topo)
        saida = PASTA / f"{nome}.png"
        img.save(saida, optimize=True)
        print(saida)


if __name__ == "__main__":
    main()
