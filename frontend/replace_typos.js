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
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('c:/NewKiranVersion/frontend/src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content
    .replace(/bg-neutral-10010/g, 'bg-neutral-100')
    .replace(/bg-neutral-10020/g, 'bg-neutral-100')
    .replace(/bg-white50/g, 'bg-neutral-100/50')
    .replace(/bg-white60/g, 'bg-neutral-100/50');
    
  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    console.log(`Updated ${file}`);
  }
});
