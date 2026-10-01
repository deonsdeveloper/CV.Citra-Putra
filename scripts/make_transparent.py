from PIL import Image
import numpy as np

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img, dtype=np.float32)
    
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    
    # Brightness / Luminance
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    
    # Chroma / Saturation (difference between max and min channel)
    max_c = np.maximum(np.maximum(r, g), b)
    min_c = np.minimum(np.minimum(r, g), b)
    chroma = max_c - min_c
    
    # Thresholds:
    # High luminance and low chroma = background (near-white / light grey)
    bg_mask_full = (lum >= 238) & (chroma < 20)
    bg_mask_trans = (lum >= 210) & (lum < 238) & (chroma < 20)
    
    # Calculate new alpha
    new_a = np.copy(a)
    new_a[bg_mask_full] = 0.0
    
    # Linear ramp for antialiased edges
    fade = (238.0 - lum[bg_mask_trans]) / (238.0 - 210.0)
    new_a[bg_mask_trans] = np.clip(fade * 255.0, 0.0, 255.0)
    
    data[:, :, 3] = new_a
    
    out_img = Image.fromarray(np.uint8(data), mode="RGBA")
    out_img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    remove_background("public/assets/hero/fotoproduk1.png", "public/assets/hero/fotoproduk1.png")
