import { Command } from 'commander';
import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/index.js';

const program = new Command();

const importCommand = program
  .createCommand('import')
  .argument('<pathname>', 'Path to the .tsv file')
  .description('Reads .tsv file and converts it into javascript objects')
  .action((pathname) => {
    try {
      const reader = new TSVFileReader(pathname);

      reader.on('line', (offer) => {
        console.log(chalk.green(JSON.stringify(offer)));
      });
      reader.on('end', (linesCount) => {
        console.log(
          chalk.bold(`Reading successful, total lines read: ${linesCount}`),
        );
      });

      reader.read();
    } catch (err) {
      console.log(chalk.red(`Error reading file: ${err}`));
      throw err;
    }
  });

export { importCommand };
