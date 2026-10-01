from PIL import Image
import numpy as np
from collections import deque
import os

def isolate_product(input_path, out_png, out_jpg):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    arr = np.array(img, dtype=np.uint8)
    
    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)
    
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c
    
    # Background candidates: light grey or near white with low chroma
    is_bg_candidate = ((lum > 215) & (chroma < 35)) | (lum > 235)
    
    # Flood-fill from borders
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    for x in range(w):
        if is_bg_candidate[0, x]:
            queue.append((0, x))
            visited[0, x] = True
        if is_bg_candidate[h - 1, x]:
            queue.append((h - 1, x))
            visited[h - 1, x] = True
            
    for y in range(h):
        if is_bg_candidate[y, 0] and not visited[y, 0]:
            queue.append((y, 0))
            visited[y, 0] = True
        if is_bg_candidate[y, w - 1] and not visited[y, w - 1]:
            queue.append((y, w - 1))
            visited[y, w - 1] = True
            
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_bg_candidate[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))
                    
    # Transparent PNG version
    arr_png = arr.copy()
    arr_png[visited, 3] = 0
    png_img = Image.fromarray(arr_png, mode="RGBA")
    png_img.save(out_png, "PNG")
    
    # Pure white JPG version
    arr_jpg = arr.copy()[:, :, :3]
    arr_jpg[visited] = [255, 255, 255]
    jpg_img = Image.fromarray(arr_jpg, mode="RGB")
    jpg_img.save(out_jpg, "JPEG", quality=98)
    
    print(f"Processed: {input_path} -> {out_png} & {out_jpg}")

products = [
    'clenol-mr-220',
    'clenol-ct-031',
    'clenol-ct-032',
    'clenol-bt-330',
    'clenol-bt-331',
]

folder = 'public/assets/products'
for p in products:
    base = os.path.join(folder, p)
    src = f"{base}.jpg" if os.path.exists(f"{base}.jpg") else f"{base}.png"
    isolate_product(src, f"{base}.png", f"{base}.jpg")
