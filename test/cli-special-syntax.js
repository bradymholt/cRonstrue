#!/usr/bin/env node

/**
 * This file demonstrates how to use the CLI with special @ syntax expressions.
 * It runs the CLI with various special expressions and shows the human-readable output.
 * 
 * Run with: node test/cli-special-syntax.js
 */

const { execSync } = require('child_process');
const path = require('path');

// Path to the CLI
const cliPath = path.join(__dirname, '..', 'bin', 'cli.js');

// Test various expressions
const expressions = [
  '@daily',
  '@weekly',
  '@monthly',
  '@yearly',
  '@annually',
  '@midnight',
  '@hourly',
  '*/5 * * * *',
  '0 0 * * 1',
  '15 14 1 * *'
];

// Display the human-readable descriptions
expressions.forEach(expr => {
  console.log(`Expression: ${expr}`);
  try {
    const output = execSync(`node ${cliPath} "${expr}"`).toString().trim();
    console.log(`Description: ${output}`);
  } catch (e) {
    console.log(`Error: ${e.message}`);
  }
  console.log('-'.repeat(50));
});