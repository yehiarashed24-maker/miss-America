from PIL import Image
import os

def process_image(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if pixel is light gray / white background
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            alpha = int(255 - (sum(item[:3]) / 3))
            if alpha < 0: alpha = 0
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Processed: {input_path} -> {output_path}")

process_image("assets/images/machines/knitting-hero-2.png", "assets/images/machines/knitting-hero-2-clean.png", threshold=238)
process_image("assets/images/machines/flat-knitting-hero.png", "assets/images/machines/flat-knitting-hero-clean.png", threshold=238)
process_image("assets/images/machines/jacquard-hero.png", "assets/images/machines/jacquard-hero-clean.png", threshold=238)
