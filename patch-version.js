import * as fs from 'fs';
import packageJson from './package.json' with {type: 'json'};

const coreScript = fs.readFileSync('./lib/core.ts', 'utf8').toString();
const regex = /const VERSION = '(.*)'/;
const versionTemplate = `const VERSION = '${packageJson.version}'`;
const replaceText = coreScript.match(regex)[0];
const bufferStr = coreScript.replace(replaceText, versionTemplate);

fs.writeFileSync('./lib/core.ts', bufferStr);
