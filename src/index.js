#!/usr/bin/env node

import { Command } from "commander";
import fs from "fs";
import { getApiKey, getConfig, saveApiKey } from "./config.js";
import { addRepo } from "./repomanager.js";
import { commitAndPush } from "./git.js";
import inquirer from 'inquirer';

const program = new Command();

program
  .name("gitdrip")
  .description("Automatically commit and push changes to origin");

  program
  .command("setup")
  .description("Setup Your api key")
  .action(async () => {
    const {apiKey} = await inquirer.prompt([
        {
            type : 'input',
            name: 'apiKey',
            message : 'Enter your OpenRouter API key.',
            validate : input => input.length > 0 || 'No response',
        },
    ]);
    saveApiKey(apiKey);
    console.log('API key saved !');
  });


program
  .command("push")
  .description("pushes current repo")
  .action(async () => {
    try {
      const apiKey = getApiKey();
      if(!apiKey){
        console.error('Not a valid API Key');
        process.exit(1);
      }
      await commitAndPush(process.cwd(),apiKey);
      console.log("commited and pushed sucessfully");
    } catch (e) {
      console.error("error", e.message);
    }
  });



const repo = program.command("repo").description("Manage repo");

repo
  .command("add <path>")
  .description("Add a git repo to be managed")
  .action((repoPath) => {
    if (!fs.existsSync(repoPath)) {
      console.error("Please enter a valid repo");
      return;
    }
    addRepo(repoPath);
    console.log("Repo added");
  });

repo
  .command("list")
  .description("shows all the repo")
  .action(() => {
    const repos = getConfig().repos;
    if (repos.length === 0) {
      console.log("No managed repos. ");
    } else {
      console.log("Managed repos: ");
      repos.forEach((repo) => {
        console.log(repo);
      });
    }
  });

program.parse();
