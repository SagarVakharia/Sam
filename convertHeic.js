const fs = require('fs');
const { promisify } = require('util');
const convert = require('heic-convert');

(async () => {
    try {
        console.log("Reading HEIC file...");
        const inputBuffer = await promisify(fs.readFile)('public/Puzzle_2.HEIC');
        console.log("Converting to JPEG...");
        const outputBuffer = await convert({
            buffer: inputBuffer, 
            format: 'JPEG',      
            quality: 1           
        });
        console.log("Writing JPEG file...");
        await promisify(fs.writeFile)('public/Puzzle_2.JPG', outputBuffer);
        console.log("Conversion successful");
    } catch(e) {
        console.error("Conversion failed:", e);
    }
})();
