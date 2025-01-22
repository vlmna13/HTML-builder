const fs = require('fs');
const path = require('path');
const wayToFile = path.resolve(__dirname, 'secret-folder');
fs.readdir(wayToFile, { withFileTypes: true }, (err, files) => {
    if(err) {
        console.log(err.message);
    } else {
        files.forEach((file) => {
            if (file.isFile()) {
              const filePath = path.join(wayToFile, file.name);
              const extension = path.parse(filePath).ext.slice(1);
              const name = path.parse(filePath).name;
              fs.stat(filePath, (err, stats) => {
                const fileSize = (stats.size / 1024).toFixed(2);
                console.log(`${name} - ${extension} - ${fileSize}kb`);
              });
            }
        });
    }
});
