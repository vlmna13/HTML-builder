const {stdin, stdout} = process;
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(filePath , 'utf-8');
stdout.write('Hello, you can write something here\n');
process.on('exit', () => {
    stdout.write('Have a good day');
});
stdin.on('data', (data) => {
    if(data.toString().trim() === 'exit') {
      process.exit();
    }
    writeStream.write(data.toString());
});
process.on('SIGINT', () => process.exit());