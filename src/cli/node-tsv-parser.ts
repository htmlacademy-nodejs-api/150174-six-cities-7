#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { Command } from 'commander';
import chalk from 'chalk';
import { TSVFileReader } from '../shared/index.js';
// import axios from 'axios';

const filePath = dirname(fileURLToPath(import.meta.url));
const packageUrl = path.resolve(filePath, '../../package.json');
const packageJsonContent = JSON.parse(await readFile(packageUrl, 'utf-8'));

const program = new Command();

program
  .name('node-tsv-parser')
  .description('Parse .tsv files with node')
  .version(packageJsonContent.version)
  .action((options) => {
    if (Object.keys(options).length === 0) {
      program.help();
    }
  });

program
  .option(
    '-i, --import <path>',
    'Reads .tsv file and converts it into javascript objects',
  )
  .action((options) => {
    const pathname = options.import;

    if (pathname) {
      try {
        const reader = new TSVFileReader(pathname);
        reader.read();

        reader.on('line', (offer) => {
          console.log(chalk.green(JSON.stringify(offer)));
        });
        reader.on('end', (linesCount) => {
          console.log(
            chalk.bold(`Reading successful, total lines red: ${linesCount}`),
          );
        });
      } catch (err) {
        console.log(chalk.red(`Error reading file: ${err}`));
        throw err;
      }
    }
  });

// program
//   .option(
//     '-g, --generate <n> <filepath> <url>',
//     'Generates random offer data and writes into TSV file',
//   )
//   .action(async (options) => {
//     const [amount, pathname, url] = options.generate;
//     if (amount && pathname && url) {
//       try {
//         const { data } = await axios.get(url);
//         const generator = new TSVOfferGenerator(data);
//         const tsvContent = generator.generate();
//         console.log(chalk.green('Writing successful'));
//       } catch (err) {
//         console.log(chalk.red(`Error writing file: ${err}`));
//         throw err;
//       }
//     }
//   });
program.parse();
