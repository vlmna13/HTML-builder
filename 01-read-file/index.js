const path = require('path');
const fs = require('fs');
const wayToText = path.join(__dirname, 'text.txt');
const readableStream = fs.createReadStream(wayToText , 'utf-8');
readableStream.on('data' , (chunk) => {
    console.log(chunk);
} )
