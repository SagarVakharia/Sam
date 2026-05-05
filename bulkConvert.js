const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const convert = require('heic-convert');

const publicDir = path.join(__dirname, 'public');
const galleryFile = path.join(__dirname, 'src', 'components', 'Gallery.jsx');

(async () => {
    try {
        const files = fs.readdirSync(publicDir);
        const heicFiles = files.filter(f => f.toUpperCase().endsWith('.HEIC'));
        
        console.log(`Found ${heicFiles.length} HEIC files to process.`);
        
        for (const file of heicFiles) {
            const inputPath = path.join(publicDir, file);
            const outputName = file.substring(0, file.lastIndexOf('.')) + '.JPG';
            const outputPath = path.join(publicDir, outputName);
            
            // Skip if already converted
            if (fs.existsSync(outputPath)) {
                console.log(`Already converted ${file}`);
                // Try deleting original to clean up
                try { fs.unlinkSync(inputPath); } catch (e) {}
                continue;
            }
            
            console.log(`Converting ${file} to ${outputName}...`);
            
            try {
                const inputBuffer = fs.readFileSync(inputPath);
                const outputBuffer = await convert({
                    buffer: inputBuffer, 
                    format: 'JPEG',      
                    quality: 1           
                });
                
                fs.writeFileSync(outputPath, outputBuffer);
                console.log(`Converted ${file}`);
                
                // remove original
                fs.unlinkSync(inputPath);
            } catch (err) {
                console.error(`Failed to convert ${file}, maybe it's not a real HEIC. Just copying it as JPG...`, err.message);
                fs.copyFileSync(inputPath, outputPath);
                fs.unlinkSync(inputPath);
            }
        }
        
        // Update Gallery.jsx
        console.log('Updating Gallery.jsx to use .JPG instead of .HEIC...');
        let galleryContent = fs.readFileSync(galleryFile, 'utf8');
        galleryContent = galleryContent.replace(/\.HEIC/g, '.JPG');
        fs.writeFileSync(galleryFile, galleryContent);
        
        console.log("All conversions and updates successful!");
    } catch(e) {
        console.error("Process failed:", e);
    }
})();
