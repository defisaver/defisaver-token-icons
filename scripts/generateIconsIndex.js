const path = require('path');
const fs = require('fs').promises;

const directoryPath = path.join(__dirname, '../icons/');
(async () => {
  const files = await fs.readdir(directoryPath)

  const imports = [];
  const tokens = [];

  for (const filename of files) {
    const filenameNoExt = filename.replace(/\.\w{3,4}$/, '');

    let token = filenameNoExt;
    const iconContent = await fs.readFile(directoryPath + filename, { encoding: 'utf-8' });
    const hasNameInComment = iconContent.match(/<!--(.*)-->/);
    if (hasNameInComment) {
      console.log(`Has name in comment: ${hasNameInComment[1]}`);
      token = hasNameInComment[1];
    }
    tokens.push(`'${token}': _${filenameNoExt}`);

    imports.push(`import _${filenameNoExt} from '../icons/${filename}';`);
  }

  let fileData = '';
  fileData += '/** AUTOMATICALLY GENERATED FILE **/\n\n';
  fileData += imports.join('\n');
  fileData += '\n\nexport default {\n';
  fileData += tokens.map(t => `  ${t}`).join(',\n');
  fileData += '\n};';
  fileData += '\n\n/** AUTOMATICALLY GENERATED FILE **/';

  const f = await fs.open(__dirname + '/../src/icons.js', 'w');
  await f.write(fileData);
  await f.close();

  console.log(`Index with ${tokens.length} icons generated: ${__dirname}/../src/icons.js`);
})();
