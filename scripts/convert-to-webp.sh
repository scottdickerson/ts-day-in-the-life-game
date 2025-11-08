#!/bin/bash

# Find all PNG files in public subdirectories
find ./public -type f -name "*.png" | while read png_file; do
    # Get the directory and filename without extension
    dir=$(dirname "$png_file")
    filename=$(basename "$png_file" .png)
    webp_file="$dir/$filename.webp"
    
    # Convert PNG to WebP
    echo "Converting: $png_file -> $webp_file"
    cwebp -q 85 "$png_file" -o "$webp_file"
    
    # Optionally remove the original PNG after successful conversion
    if [ $? -eq 0 ]; then
        echo "✓ Converted successfully"
        # Uncomment to delete original PNGs:
        # rm "$png_file"
    else
        echo "✗ Conversion failed"
    fi
done

# Update JSON files - replace .png with .webp
echo "Updating JSON files..."
find . -type f -name "*.json" -exec sed -i 's/\.png"/.webp"/g' {} +

# Update TypeScript/JavaScript files
echo "Updating TypeScript/JavaScript files..."
find ./src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" \) -exec sed -i 's/\.png/.webp/g' {} +

echo "Done! All PNG references updated to WebP in JSON and source files."
