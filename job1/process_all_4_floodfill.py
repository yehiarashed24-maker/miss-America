import sys
from PIL import Image

def remove_background_floodfill(input_path, output_path, tolerance=50):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # Sample 4 corners
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    corner_colors = [pixels[x, y] for x, y in corners]
    
    def is_bg(col):
        for cc in corner_colors:
            dist = math_dist(col, cc)
            if dist <= tolerance:
                return True
        return False

    def math_dist(c1, c2):
        return ((c1[0] - c2[0])**2 + (c1[1] - c2[1])**2 + (c1[2] - c2[2])**2)**0.5

    visited = set()
    queue = []
    
    # Start flood fill from outer border pixels
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
        
        if is_bg(curr):
            pixels[x, y] = (curr[0], curr[1], curr[2], 0)
            
            # Neighbors
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and (nx, ny) not in visited:
                    visited.add((nx, ny))
                    if is_bg(pixels[nx, ny]):
                        queue.append((nx, ny))

    img.save(output_path, "PNG")
    print(f"Processed: {input_path} -> {output_path}")

# Run on ALL 4 machines at once!
machines = [
    "assets/images/machines/knitting-hero-1.png",
    "assets/images/machines/knitting-hero-2.png",
    "assets/images/machines/flat-knitting-hero.png",
    "assets/images/machines/jacquard-hero.png"
]

for m_path in machines:
    try:
        remove_background_floodfill(m_path, m_path, tolerance=55)
    except Exception as e:
        print(f"Error processing {m_path}: {e}")
