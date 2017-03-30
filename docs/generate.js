// Generates documention index.html webpage given a markdown file
// Usage: node generate.js README.md

"use strict";

const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const marked = require('marked');

let readme = fs.readFileSync(process.argv[2], 'utf8');
let content = marked(readme);

const templateFile = path.join(__dirname, 'index.hbs.html');
const outputFile = path.join(__dirname, 'index.html');
let templateSource = fs.readFileSync(templateFile, 'utf8');
let template = handlebars.compile(templateSource);
let html = template({ content: content });

fs.writeFileSync(outputFile, html, {encoding: 'utf8' });
