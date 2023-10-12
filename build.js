const fs = require('fs');
const path = require('path');

function getDirectoriesWithIndex(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(p => fs.statSync(p).isDirectory() && fs.existsSync(path.join(p, 'index.html')));
}

function getIgnoredDirectories() {
  const gitIgnorePath = path.join(__dirname, '.gitignore');

  if (!fs.existsSync(gitIgnorePath)) {
    return [];
  }

  const gitIgnoreContent = fs.readFileSync(gitIgnorePath, 'utf8');
  return gitIgnoreContent.split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith("#") && fs.statSync(path.join(__dirname, line)).isDirectory());
}

const directories = getDirectoriesWithIndex(__dirname).sort();
const ignoredDirectories = getIgnoredDirectories();

const visibleDirectories = directories.filter(dir => !ignoredDirectories.includes(dir));

let htmlContent = '<ul>';
visibleDirectories.forEach(dir => {
  const relativeDir = path.relative(__dirname, dir);
  htmlContent += `<li><a href="${relativeDir}/index.html">${relativeDir}</a></li>`;
});
htmlContent += '</ul>';

fs.writeFileSync('index.html', htmlContent);
