const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');
const start = path.join(__dirname, 'styles');
const end = path.join(__dirname, 'project-dist', 'bundle.css');

async function createCommonStyle() {
    try {
        const commonFile = fs.createWriteStream(end, 'utf8');
        const files = await fsPromises.readdir(start, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(start, file.name);
            const extension = path.parse(filePath).ext.slice(1);

            if (file.isFile() && extension === 'css') {
                const data = await fsPromises.readFile(filePath, 'utf8');
                commonFile.write(`${data}\n`);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

createCommonStyle();


