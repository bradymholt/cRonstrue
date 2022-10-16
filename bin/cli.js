#!/usr/bin/env node

const cronstrue = require('../dist/cronstrue');

function usage() {
  console.error("Usage (5 args): cronstrue minute hour day-of-month month day-of-week");
  console.error("or")
  console.error("Usage (6 args): cronstrue second minute hour day-of-month month day-of-week");
  console.error("or")
  console.error("Usage (7 args): cronstrue second minute hour day-of-month month day-of-week year");
}

const args = process.argv.slice(2).join(" ");
const argCount = args.trim().split(/\s+/).length;
if (argCount < 5) {
  console.error(`Error: too few arguments (${argCount}): ${args}`);
  usage()
  process.exit(1);
}

if (argCount > 7) {
  console.error(`Error: too many arguments (${argCount}): ${args}`);
  usage();
  process.exit(2);
}
console.log(cronstrue.toString(args));
