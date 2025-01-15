const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const templateFile = path.join(__dirname, 'template.html');
const componentsDir = path.join(__dirname, 'components');
const stylesDir = path.join(__dirname, 'styles');
const assetsDir = path.join(__dirname, 'assets');
const outputHtml = path.join(projectDist, 'index.html');
const outputCss = path.join(projectDist, 'style.css');
const outputAssets = path.join(projectDist, 'assets');

async function createProjectDist() {
    await fsPromises.mkdir(projectDist, { recursive: true });
}

async function buildHtml() {
    let template = await fsPromises.readFile(templateFile, 'utf8');
    const componentFiles = await fsPromises.readdir(componentsDir, { withFileTypes: true });

    for (const file of componentFiles) {
        if (file.isFile() && path.extname(file.name) === '.html') {
            const componentName = path.basename(file.name, '.html');
            const componentContent = await fsPromises.readFile(path.join(componentsDir, file.name), 'utf8');
            const regex = new RegExp(`{{${componentName}}}`, 'g');
            template = template.replace(regex, componentContent);
        }
    }

    await fsPromises.writeFile(outputHtml, template, 'utf8');
}

async function createCommonStyle() {
    try {
        const commonFile = fs.createWriteStream(outputCss, 'utf8');
        const files = await fsPromises.readdir(stylesDir, { withFileTypes: true });

        for (const file of files) {
            const filePath = path.join(stylesDir, file.name);
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

async function copy(src, dest) {
    try {
        await fsPromises.rm(dest, { force: true, recursive: true });
        await fsPromises.mkdir(dest, { recursive: true });
        const entries = await fsPromises.readdir(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await copy(srcPath, destPath);
            } else {
                await fsPromises.copyFile(srcPath, destPath);
            }
        }
    } catch (error) {
        console.error('The file could not be copied');
    }
}

async function buildPage() {
    try {
        await createProjectDist();
        await buildHtml();
        await createCommonStyle();
        await copy(assetsDir, outputAssets);
    } catch (error) {
        console.error(error);
    }
}

buildPage();