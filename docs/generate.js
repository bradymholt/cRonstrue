// Generates documention index.html webpage given a markdown file
// Usage: node generate.js README.md

"use strict";

const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const marked = require('marked');

let templateFile = path.join(__dirname, 'template.hbs.html');
let outputFile = path.join(__dirname, 'index.html');

let config = require('../package.json');

let readme = fs.readFileSync(process.argv[2], 'utf8');
let content = marked(readme);

let templateSource = fs.readFileSync(templateFile, 'utf8');
let template = handlebars.compile(templateSource);
let html = template({ config: config, content: content });

fs.writeFileSync(outputFile, html, {encoding: 'utf8' });
