const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const sizes = [
    32, 72, 96, 128, 144, 152, 180, 192, 384, 512
];

async function generateIcons() {
    const inputSvg = path.join(__dirname, 'images', 'icons', 'icon.svg');
    const outputDir = path.join(__dirname, 'images', 'icons');

    try {
        // Ensure output directory exists
        await fs.mkdir(outputDir, { recursive: true });

        // Generate PNG icons for each size
        for (const size of sizes) {
            await sharp(inputSvg)
                .resize(size, size)
                .png()
                .toFile(path.join(outputDir, `icon-${size}x${size}.png`));
            
            console.log(`Generated ${size}x${size} icon`);
        }

        console.log('All icons generated successfully!');
    } catch (error) {
        console.error('Error generating icons:', error);
    }
}

generateIcons();
