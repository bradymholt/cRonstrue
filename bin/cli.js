#!/usr/bin/env node

const cronstrue = require('../dist/cronstrue');

function usage() {
  console.error("Usage: cronstrue \"<expression>\"");
  console.error("  or");
  console.error("Usage (5 args): cronstrue minute hour day-of-month month day-of-week");
  console.error("  or");
  console.error("Usage (6 args): cronstrue second minute hour day-of-month month day-of-week");
  console.error("  or");
  console.error("Usage (7 args): cronstrue second minute hour day-of-month month day-of-week year");
  console.error("");
  console.error("Examples:");
  console.error("  cronstrue \"*/5 * * * *\"");
  console.error("  cronstrue \"@daily\"");
  console.error("  cronstrue 0 0 * * 1");
}

const args = process.argv.slice(2);

// Handle the case where a single argument is provided, which might be a complete cron expression or special @ syntax
if (args.length === 1) {
  console.log(cronstrue.toString(args[0]));
  process.exit(0);
}

// Handle the 5-7 arguments case
const expression = args.join(" ");
const argCount = args.length;
if (argCount < 5) {
  console.error(`Error: too few arguments (${argCount}): ${expression}`);
  usage();
  process.exit(1);
}

if (argCount > 7) {
  console.error(`Error: too many arguments (${argCount}): ${expression}`);
  usage();
  process.exit(2);
}

console.log(cronstrue.toString(expression));
