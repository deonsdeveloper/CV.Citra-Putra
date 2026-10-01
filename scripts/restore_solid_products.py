import os
import shutil
from PIL import Image
import numpy as np
from collections import deque

brain_dir = 'C:\\Users\\welcome\\.gemini\\antigravity-ide\\brain\\7902db1f-35b5-4c6e-a69b-5d0ec340cde6'
out_dir = 'public/assets/products'

mapping = {
    'mr_220_studio_1786985476684.jpg': 'clenol-mr-220',
    'ct_031_studio_1786985491780.jpg': 'clenol-ct-031',
    'ct_032_studio_1786985712422.jpg': 'clenol-ct-032',
    'bt_330_studio_1786985991362.jpg': 'clenol-bt-330',
    'bt_331_studio_1786986164607.jpg': 'clenol-bt-331',
}

for src_name, target_base in mapping.items():
    src_path = os.path.join(brain_dir, src_name)
    img = Image.open(src_path).convert('RGB')
    w, h = img.size
    arr = np.array(img, dtype=np.uint8)
    
    r = arr[:, :, 0].astype(np.float32)
    g = arr[:, :, 1].astype(np.float32)
    b = arr[:, :, 2].astype(np.float32)
    
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c
    
    # Only flood fill the perimeter studio background
    is_bg_candidate = (lum > 235) & (chroma < 15)
    
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
                    
    # Set the outer background to pure #FFFFFF (255, 255, 255)
    arr_pure_white = arr.copy()
    arr_pure_white[visited] = [255, 255, 255]
    
    # Save as high-quality JPG & PNG with pure #FFFFFF background
    img_out = Image.fromarray(arr_pure_white, mode='RGB')
    jpg_path = os.path.join(out_dir, f"{target_base}.jpg")
    png_path = os.path.join(out_dir, f"{target_base}.png")
    img_out.save(jpg_path, 'JPEG', quality=98)
    img_out.save(png_path, 'PNG')
    print(f"Restored & saved {target_base} with solid intact product body and pure #FFFFFF background")
