#!/usr/bin/env node

import { readFile } from "fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { Command } from "commander";
import { TSVFileReader } from "./src/shared";
import chalk from "chalk";

const filePath = fileURLToPath(import.meta.url);
const packageUrl = path.resolve(filePath, "../package.json");
const packageJsonContent = JSON.parse(await readFile(packageUrl, "utf-8"));
const program = new Command();

program
  .name("node-tsv-parser")
  .description("Parse .tsv files with node")
  .version(packageJsonContent.version);

program
  .command("--import")
  .description("Reads .tsv file and converts it into javascript objects")
  .argument("<path>", "path to importing .tsv file")
  .action((pathname) => {
    const reader = new TSVFileReader(pathname);
    reader.read();
    const result = reader.toArray();
    console.log(chalk.green("Reading successful: ", result));
  });

program.parse();
