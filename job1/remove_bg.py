import sys
from PIL import Image

def remove_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    
    # Get pixel data
    data = img.getdata()
    
    # Get background color from top-left pixel
    bg_color = data[0]
    
    new_data = []
    for item in data:
        # Check if pixel is similar to background color
        if (abs(item[0] - bg_color[0]) <= tolerance and
            abs(item[1] - bg_color[1]) <= tolerance and
            abs(item[2] - bg_color[2]) <= tolerance):
            # Make pixel transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Processed {input_path} -> {output_path}")

try:
    remove_background("assets/images/machines/knitting-hero-2.png", "assets/images/machines/knitting-hero-2-trans.png")
    remove_background("assets/images/machines/flat-knitting-hero.png", "assets/images/machines/flat-knitting-hero-trans.png")
    remove_background("assets/images/machines/jacquard-hero.png", "assets/images/machines/jacquard-hero-trans.png")
except Exception as e:
    print(f"Error: {e}")
