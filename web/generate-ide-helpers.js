const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const _ = require('lodash');
const chokidar = require('chokidar');

tailwindcss();

chokidar
  .watch('tailwind.config.js')
  .on('change', tailwindcss);

chokidar
  .watch('src/components/ui/**/*.vue')
  .on('add', uiComponents)
  .on('unlink', uiComponents);

function uiComponents() {
  const files = glob.sync('src/components/ui/**/*.vue').map((file) => `@/${path.relative('src', file.slice(0, file.indexOf('.'))).replace(/\\/g, '/')}`);
  const names = files.map((file) => file.slice(file.lastIndexOf('/') + 1));
  const imports = files.map((file, index) => `import ${names[index]} from '${file}';`);
  const registrations = names.map((name) => `Vue.component('${_.kebabCase(name)}', ${name});`);

  const fileContent = `import Vue from 'vue';\n${imports.join('\n')}\n\n${registrations.join('\n')}\n`;

  if (!fs.existsSync('.ide-helper')) {
    fs.mkdirSync('.ide-helper');
  }

  fs.writeFileSync(path.resolve(__dirname, '.ide-helper/register-ui.js'), fileContent);
}

function tailwindcss() {
  execSync('npx tailwindcss build src/css/tailwind.css -o .ide-helper/tailwind.css');
}
