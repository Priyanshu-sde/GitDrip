#!/usr/bin/env node

import { Command } from "commander";
import fs from 'fs';
import { getConfig } from "./config.js";
import { addRepo } from "./repomanager.js";

const program = new Command();

program
  .name("gitdrip")
  .description("Automatically commit and push changes to origin");

  const repo = program.command('repo').description('Manage repo');

repo
  .command("add <path>")
  .description("Add a git repo to be managed")
  .action((repoPath) => {
    if(!fs.existsSync(repoPath)){
        console.error('Please enter a valid repo')
        return;
    }
    addRepo(repoPath);
    console.log("Repo added");
  });

  repo.command("list").description("shows all the repo").action(() => {
    const repos = getConfig().repos;
    if(repos.length === 0){
        console.log("No managed repos. ");
    } 
    else{
        console.log("Managed repos: ");
            repos.forEach(repo => {
                console.log(repo);                
            });
        }
  })

program.parse();
