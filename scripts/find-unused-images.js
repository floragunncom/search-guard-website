const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Directories
const IMAGE_DIR = path.join(__dirname, '../src/images');
const SCAN_DIRS = [
    path.join(__dirname, '../src/components'),
    path.join(__dirname, '../src/views')
];

// Supported image file extensions
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'];

// Parse command-line arguments
const args = process.argv.slice(2);
const deleteImages = args.includes('--delete-images=true');

/**
 * Get all image files in the images directory.
 */
function getAllImages(dir) {
    return fs.readdirSync(dir)
        .filter(file => IMAGE_EXTENSIONS.includes(path.extname(file)))
        .map(file => file.trim());
}

/**
 * Recursively scan directories for references to an image.
 */
function isImageUsed(imageName, directories) {
    for (const dir of directories) {
        const files = fs.readdirSync(dir, { withFileTypes: true });

        for (const file of files) {
            const fullPath = path.join(dir, file.name);

            if (file.isDirectory()) {
                if (isImageUsed(imageName, [fullPath])) return true;
            } else if (/\.(js|jsx|ts|tsx|css|scss|html)$/.test(file.name)) {
                const content = fs.readFileSync(fullPath, 'utf-8');
                if (content.includes(imageName)) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Ask for user confirmation on the command line.
 */
function askForConfirmation(question) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.trim().toLowerCase() === 'yes');
        });
    });
}

/**
 * Delete unused images.
 */
function deleteImagesFromDisk(unusedImages) {
    unusedImages.forEach((image) => {
        const imagePath = path.join(IMAGE_DIR, image);
        try {
            fs.unlinkSync(imagePath);
            console.log(`🗑️ Deleted: ${image}`);
        } catch (err) {
            console.error(`❌ Failed to delete ${image}: ${err.message}`);
        }
    });
}

/**
 * Main function to find unused images.
 */
async function findUnusedImages() {
    console.log('🔍 Scanning for unused images...');

    const allImages = getAllImages(IMAGE_DIR);
    const unusedImages = allImages.filter((image) => !isImageUsed(image, SCAN_DIRS));

    if (unusedImages.length > 0) {
        console.log('🚨 Unused Images Found:');
        unusedImages.forEach((image) => console.log(`- ${image}`));

        if (deleteImages) {
            const confirmed = await askForConfirmation(
                `\n⚠️ Are you sure you want to delete ${unusedImages.length} images? (yes/no): `
            );

            if (confirmed) {
                deleteImagesFromDisk(unusedImages);
                console.log('✅ All unused images have been deleted.');
            } else {
                console.log('❌ Deletion cancelled by user.');
            }
        } else {
            console.log(`\nℹ️ Run the script with '--delete-images=true' to delete these images.`);
        }
    } else {
        console.log('✅ No unused images found. Everything is clean!');
    }
}

// Run the script
findUnusedImages();
