import math
from PIL import Image

def remove_bg_smart(input_path, output_path, distance_threshold=45):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Get corner background color (average top-left 5x5)
    r_sum, g_sum, b_sum, count = 0, 0, 0, 0
    for x in range(min(10, width)):
        for y in range(min(10, height)):
            r, g, b, a = pixels[x, y]
            r_sum += r
            g_sum += g
            b_sum += b
            count += 1
            
    bg_r = r_sum / count
    bg_g = g_sum / count
    bg_b = b_sum / count
    
    print(f"Sampled bg color for {input_path}: ({bg_r:.1f}, {bg_g:.1f}, {bg_b:.1f})")
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            dist = math.sqrt((r - bg_r)**2 + (g - bg_g)**2 + (b - bg_b)**2)
            
            if dist < distance_threshold:
                pixels[x, y] = (r, g, b, 0)
            elif dist < distance_threshold + 20:
                # Alpha fade edge
                alpha_factor = (dist - distance_threshold) / 20.0
                pixels[x, y] = (r, g, b, int(255 * alpha_factor))

    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

# 1. Process the newly generated Double Jersey machine (pure white bg)
remove_bg_smart(
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/double_jersey_knitting_hero_1785844966706.png",
    "assets/images/machines/knitting-hero-2.png",
    distance_threshold=30
)

# 2. Process Flat Knitting Machine
remove_bg_smart(
    "assets/images/machines/flat-knitting-hero-clean.png",
    "assets/images/machines/flat-knitting-hero.png",
    distance_threshold=40
)

# 3. Process Jacquard Machine
remove_bg_smart(
    "assets/images/machines/jacquard-hero-clean.png",
    "assets/images/machines/jacquard-hero.png",
    distance_threshold=40
)
