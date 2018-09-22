#!/usr/bin/env npx jbash

// Generates documention index.html from README.md

const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const marked = require("marked");

const config = require("../package.json");
const readmeFile = path.join(__dirname, "../README.md");
const templateFile = path.join(__dirname, "../docs/template.hbs.html");
const outputFile = path.join(__dirname, "../docs/index.html");

let readmeContent = cat(readmeFile);
let readmeHtml = marked(readmeContent);
let templateContent = cat(templateFile);

let templateCompiled = handlebars.compile(templateContent);
let html = templateCompiled({ config: config, content: readmeHtml });

echo(html, outputFile);
