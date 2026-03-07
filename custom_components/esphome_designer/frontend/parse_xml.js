const fs = require('fs');
const xml = fs.readFileSync('out.xml', 'utf16le');
const match = xml.match(/<failure message="([^"]+)"/);
if (match) console.log(match[1]);
else console.log("No match");
