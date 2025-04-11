// Simple script to examine what anime.js exports
const animeJs = require('animejs');
console.log('Full anime.js exports:');
console.log(Object.keys(animeJs));
console.log('Is a function?', typeof animeJs === 'function');