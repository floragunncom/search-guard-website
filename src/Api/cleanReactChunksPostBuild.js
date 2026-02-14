const fs = require('fs');
const path = require('path');

// Legacy helper kept for compatibility with older deployment scripts.
const targetDirectory = './dist/assets/';
const fileRegex = /\.js$/;

if (!fs.existsSync(targetDirectory)) {
  console.log(`Skip clearReactChunks: ${targetDirectory} does not exist`);
  process.exit(0);
}

function findAndClearFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      if (fileRegex.test(file)) {
        fs.writeFile(filePath, '', (writeErr) => {
          if (writeErr) {
            console.error('Error clearing file:', writeErr);
          } else {
            console.log(`Cleared contents of file: ${filePath}`);
          }
        });
      }
    });
  });
}

findAndClearFiles(targetDirectory);
