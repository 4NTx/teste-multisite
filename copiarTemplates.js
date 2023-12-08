const ncp = require('ncp').ncp;
const path = require('path');

const sourceDir = path.join(__dirname, 'src', 'template', 'defaults');
const destDir = path.join(__dirname, 'dist', 'template', 'defaults');

ncp(sourceDir, destDir, function (err) {
  if (err) {
    return console.error('Deu ruim', err);
  }
  console.log('Deu bão porra!');
});