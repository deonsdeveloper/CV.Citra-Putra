from PIL import Image
import numpy as np
from collections import deque

def isolate_clean(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    w, h = img.size
    arr = np.array(img, dtype=np.uint8)
    
    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)
    
    # Calculate luminance
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    
    # Chroma / color saturation
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c
    
    # Background candidates: light grey or near white with low chroma
    is_bg_candidate = (lum > 185) & (chroma < 35) | (lum > 220)
    
    # Flood-fill from borders to only remove outside background
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    
    # Add all border pixels that are bg candidates
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
            
    # BFS flood fill
    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_bg_candidate[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))
                    
    # Create final alpha channel
    alpha = arr[:, :, 3].copy()
    alpha[visited] = 0
    
    # For pixels on border of visited, apply smooth anti-aliased edge
    arr[:, :, 3] = alpha
    
    out = Image.fromarray(arr, mode="RGBA")
    out.save(output_path, "PNG")
    print(f"Clean isolation saved to {output_path}")

if __name__ == "__main__":
    src = "C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6\\chemical_floating_transparent_1787035470369.jpg"
    isolate_clean(src, "public/assets/hero/fotoproduk1-clean.png")
    isolate_clean(src, "public/assets/hero/fotoproduk1.png")
