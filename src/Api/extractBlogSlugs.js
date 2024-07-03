const fs = require('fs');
const path = require('path');

// Path to the JSON file
const jsonFilePath = path.join(__dirname, './contentfulPosts.json');

// Read the JSON file
fs.readFile(jsonFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the JSON file:', err);
        return;
    }

    // Parse the JSON data
    let jsonData;
    try {
        jsonData = JSON.parse(data);
    } catch (parseError) {
        console.error('Error parsing the JSON data:', parseError);
        return;
    }

    // Extract the 'slug' values
    const slugs = jsonData.map(item => item.fields.slug);

    // Path to the output file
    const outputFilePath = path.join(__dirname, './slugs.txt');

    // Write the slugs to the output file, one per line
    fs.writeFile(outputFilePath, slugs.join('\n'), (err) => {
        if (err) {
            console.error('Error writing to the output file:', err);
        } else {
            console.log('Slugs successfully written to', outputFilePath);
        }
    });
});
