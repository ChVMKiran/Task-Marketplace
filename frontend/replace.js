const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/NewKiranVersion/frontend/src/app/dashboard');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/divide-white\/5/g, 'divide-neutral-200')
    .replace(/hover:bg-white\/\[0\.02\]/g, 'hover:bg-neutral-100/50')
    .replace(/hover:bg-white\/\[0\.03\]/g, 'hover:bg-neutral-100/50')
    .replace(/hover:bg-white\/5/g, 'hover:bg-neutral-100/50')
    .replace(/bg-white\/\[0\.03\]/g, 'bg-neutral-100/50')
    .replace(/bg-neutral-1000\.03\]/g, 'bg-neutral-100/50');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
});
