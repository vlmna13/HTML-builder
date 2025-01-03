const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const information = fs.createReadStream(filePath);
information.on('data', (chunk) => console.log(chunk.toString()));