var current_path = process.cwd();
console.log(current_path);
require('runkoa')(__dirname + '/entry.js')