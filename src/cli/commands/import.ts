import { Command } from 'commander';
import chalk from 'chalk';
import { ConfigSchema, TSVFileReader } from '../../shared/libs/index.js';
import { Offer } from '../../models/offer.interface.js';
import { DefaultUserService } from '../../shared/modules/user/default-user.service.js';
import { UserModel } from '../../shared/modules/user/user.entity.js';
import { DefaultOfferService } from '../../shared/modules/offer/offer.service.js';
import { OfferModel } from '../../shared/modules/offer/offer.entity.js';
import { getEnv } from '../../utils/env.js';
import { configureApp } from '../application.config.js';

const program = new Command();

const importCommand = program
  .createCommand('import')
  .argument('<pathname>', 'Path to the .tsv file')
  .description('Reads .tsv file and converts it into javascript objects')
  .action(async (pathname) => {
    try {
      const env = getEnv<ConfigSchema>();
      await configureApp();

      const reader = new TSVFileReader(pathname);
      const userService = new DefaultUserService(console, UserModel);
      const offerService = new DefaultOfferService(console, OfferModel);

      reader.on('line', async (offer: Offer) => {
        console.log(chalk.green(JSON.stringify(offer)));
        const user = await userService.findOrCreate(
          offer.author as Required<Offer['author']>,
          env.SALT,
        );

        await offerService.create({ ...offer, userId: user.id });
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
