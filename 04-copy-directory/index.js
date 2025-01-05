const fs = require('fs/promises');
const path = require('path');
const start = path.join(__dirname, 'files');
const end = path.join(__dirname, 'files-copy');

async function copy() {
    try {
        await fs.rm(end, { force: true, recursive: true }, err => {
            if (err) console.log(err);
        });
        await fs.mkdir(end, { recursive: true }, err => {
            if (err) console.log(err);
        });
        const files = await fs.readdir(start);
        files.map(el => {
            const filePath = path.join(start, el);
            const newFile = path.join(end, el);
            fs.copyFile(filePath, newFile);
        })
    } catch (error){
        console.error('The file could not be copied');
    }
}

copy()

