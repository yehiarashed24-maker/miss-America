from PIL import Image

def make_white_transparent(input_path, output_path, threshold=245):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        if item[0] >= threshold and item[1] >= threshold and item[2] >= threshold:
            alpha = int(255 - (sum(item[:3]) / 3))
            if alpha < 0: alpha = 0
            new_data.append((item[0], item[1], item[2], alpha))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed {input_path} -> {output_path}")

make_white_transparent(
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/single_jersey_knitting_hero_1785844226100.png",
    "assets/images/machines/knitting-hero-1.png",
    threshold=245
)
