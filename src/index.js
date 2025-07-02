#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("gitdrip")
  .description(
    "Automatically commit and push changes to origin"
  );


program.parse();
