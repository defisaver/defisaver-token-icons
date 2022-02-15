const reactDomServer = require('react-dom/server');
const tokens = require('@defisaver/tokens');

const fs = require('fs').promises;
(async () => {
  for (const token of tokens.assets) {
    let fileName = token.symbol;
    let fileContent = reactDomServer.renderToString(token.icon())
    if (token.symbol.match(/[^a-zA-Z0-9]/)) {
      fileName = fileName.replace(/[^a-zA-Z0-9]/g, '_');
      fileContent = `<!--${token.symbol}-->\n` + fileContent
    }
    const f = await fs.open(`${__dirname}/../icons/${fileName}.svg`, 'w');
    await f.write(fileContent);
    await f.close();
  }
})();
