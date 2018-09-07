/**
 * Script that removes duplicate keys and orders alphabetically
 * any given json language
 */
import * as program from 'commander';
import * as path from 'path';
import * as fs from 'fs';
import { clean } from '../lib/clean';
const { version } = require('../../package.json');

program.version(version)
  .option('-i --input [value]')
  .parse(process.argv);

// Read the document
const document = require(path.resolve(program.input));

// Clean the object
const newObject = clean(document);

// Write the out file
fs.writeFileSync(path.resolve(__dirname, 'out.json'), JSON.stringify(newObject, null, 2), 'utf8');
