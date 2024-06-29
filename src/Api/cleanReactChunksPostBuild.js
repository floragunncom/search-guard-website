const fs = require('fs');
const path = require('path');

// Directory to change into
const targetDirectory = '../../build/static/js/';

// Regular expressions to match files
const fileRegex1 = /\.txt$/; // Change this to your first specific regex
const fileRegex2 = /\.log$/; // Change this to your second specific regex

// Change into the target directory
process.chdir(targetDirectory);

// Function to find and process files
function findAndClearFiles(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(directory, file);

            // Check if the file matches either of the regular expressions
            if (fileRegex1.test(file) || fileRegex2.test(file)) {
                fs.writeFile(filePath, '', (err) => {
                    if (err) {
                        console.error('Error clearing file:', err);
                    } else {
                        console.log(`Cleared contents of file: ${filePath}`);
                    }
                });
            }
        });
    });
}

// Call the function
findAndClearFiles(process.cwd());
