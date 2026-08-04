import os
from PIL import Image

def process_image(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Corners sample
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    
    def math_dist(c1, c2):
        return ((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2)**0.5

    def is_light_bg(col):
        # White/off-white studio background (RGB > 220 or close to corner colors)
        r, g, b, a = col
        if r > 220 and g > 220 and b > 220:
            return True
        for cx, cy in corners:
            cc = pixels[cx, cy]
            if math_dist(col, cc) < 45:
                return True
        return False

    visited = set()
    queue = []
    
    # Outer border flood fill
    for x in range(width):
        queue.append((x, 0))
        queue.append((x, height - 1))
    for y in range(height):
        queue.append((0, y))
        queue.append((width - 1, y))
        
    for item in queue:
        visited.add(item)
        
    while queue:
        x, y = queue.pop(0)
        curr = pixels[x, y]
        
        if is_light_bg(curr):
            pixels[x, y] = (curr[0], curr[1], curr[2], 0)
            
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    if is_light_bg(pixels[nx, ny]):
                        queue.append((nx, ny))

    img.save(output_path, "PNG")
    print(f"Successfully created transparent PNG: {output_path}")

input_files = [
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/media__1785845706726.jpg",
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/media__1785845706746.jpg",
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/media__1785845706762.jpg",
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/media__1785845706774.jpg",
    "/Users/yousef/.gemini/antigravity-ide/brain/8557a9f9-66fc-409e-90fb-1d18f070f8fc/media__1785845706794.jpg"
]

os.makedirs("assets/images/machines", exist_ok=True)

for i, in_path in enumerate(input_files, start=1):
    out_path = f"assets/images/machines/real-machine-{i}.png"
    try:
        process_image(in_path, out_path)
    except Exception as e:
        print(f"Error processing {in_path}: {e}")
