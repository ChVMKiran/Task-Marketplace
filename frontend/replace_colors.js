const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = [
  // Gradients
  [/from-violet-\d+/g, 'from-neutral-200'],
  [/to-indigo-\d+/g, 'to-neutral-400'],
  [/via-indigo-\d+/g, 'via-neutral-300'],
  [/from-navy-\d+/g, 'from-white'],
  [/to-navy-\d+/g, 'to-neutral-100'],
  [/from-blue-\d+/g, 'from-neutral-300'],
  [/to-blue-\d+/g, 'to-neutral-400'],
  [/to-violet-\d+/g, 'to-neutral-300'],
  [/to-purple-\d+/g, 'to-neutral-300'],
  [/from-indigo-\d+/g, 'from-neutral-200'],
  [/from-emerald-\d+/g, 'from-neutral-200'],
  [/via-amber-\d+/g, 'via-neutral-200'],
  [/to-emerald-\d+/g, 'to-neutral-300'],
  [/from-pink-\d+/g, 'from-neutral-200'],
  [/to-pink-\d+/g, 'to-neutral-300'],
  [/via-transparent/g, 'via-transparent'], // keep
  [/from-orange-\d+/g, 'from-neutral-200'],
  [/from-yellow-\d+/g, 'from-neutral-200'],
  
  // Backgrounds
  [/bg-violet-\d+\/?\[?.*?\]?/g, 'bg-neutral-100'],
  [/bg-navy-\d+\/?\[?.*?\]?/g, 'bg-white'],
  [/bg-slate-\d+\/?\[?.*?\]?/g, 'bg-white'],
  [/bg-indigo-\d+\/?\[?.*?\]?/g, 'bg-neutral-200'],
  [/bg-blue-\d+\/?\[?.*?\]?/g, 'bg-neutral-100'],
  [/bg-purple-\d+\/?\[?.*?\]?/g, 'bg-neutral-100'],
  
  // Text
  [/text-violet-\d+/g, 'text-neutral-900'],
  [/text-slate-\d+/g, 'text-neutral-600'],
  [/text-indigo-\d+/g, 'text-neutral-800'],
  [/text-navy-\d+/g, 'text-neutral-900'],
  [/text-blue-\d+/g, 'text-neutral-900'],
  [/text-purple-\d+/g, 'text-neutral-900'],
  
  // Borders
  [/border-violet-\d+\/?\d*/g, 'border-neutral-200'],
  [/border-slate-\d+\/?\d*/g, 'border-neutral-200'],
  [/border-navy-\d+\/?\d*/g, 'border-neutral-200'],
  [/border-indigo-\d+\/?\d*/g, 'border-neutral-200'],
  [/border-white\/?\d*/g, 'border-neutral-200'],
  
  // Shadows
  [/shadow-violet-\d+\/?\d*/g, 'shadow-neutral-200'],
  [/shadow-indigo-\d+\/?\d*/g, 'shadow-neutral-200'],
  [/shadow-navy-\d+\/?\d*/g, 'shadow-neutral-200'],
  [/shadow-blue-\d+\/?\d*/g, 'shadow-neutral-200'],
  
  // Hover Backgrounds
  [/hover:bg-violet-\d+\/?\d*/g, 'hover:bg-neutral-100'],
  [/hover:bg-slate-\d+\/?\d*/g, 'hover:bg-neutral-50'],
  [/hover:bg-navy-\d+\/?\d*/g, 'hover:bg-neutral-50'],
  [/hover:bg-indigo-\d+\/?\d*/g, 'hover:bg-neutral-100'],
  
  // Hover Text
  [/hover:text-violet-\d+/g, 'hover:text-neutral-900'],
  [/hover:text-slate-\d+/g, 'hover:text-neutral-900'],
  
  // Hover Border
  [/hover:border-violet-\d+\/?\d*/g, 'hover:border-neutral-300'],
  [/hover:border-slate-\d+\/?\d*/g, 'hover:border-neutral-300'],
  
  // Rings
  [/ring-violet-\d+\/?\d*/g, 'ring-neutral-200'],
  [/focus:ring-violet-\d+\/?\d*/g, 'focus:ring-neutral-300'],
  
  // Glows (if any custom tailwind class)
  [/glow-violet/g, 'glow-sky'], // mapped to grey in globals
  [/glow-violet-pulse/g, 'glow-sky']
];

function processDir(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.jsx') || fullPath.endsWith('.js'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Fix dark text colors
      content = content.replace(/text-white/g, 'text-black');
      content = content.replace(/text-slate-300/g, 'text-neutral-600');
      content = content.replace(/text-slate-400/g, 'text-neutral-600');
      
      for (const [regex, replacement] of replacements) {
        content = content.replace(regex, replacement);
      }
      
      // Clean up any remaining obvious dark theme classes that ruin the light theme
      content = content.replace(/bg-background/g, 'bg-white');
      content = content.replace(/text-foreground/g, 'text-black');
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

processDir(srcDir);
console.log('All files processed recursively.');
