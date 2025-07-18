import { Command } from "commander";
import fs from "fs";
import { getApiKey, getConfig, saveApiKey } from "./config.js";
import { addDir, addRepo, removeRepo, scanDir } from "./repomanager.js";
import { commitAndPush, commitAndPushAll } from "./git.js";
import inquirer from "inquirer";
import {
  checkSSH,
  generateSshKey,
  setupSSHwithGitHub,
  trustGitHost,
} from "./ssh.js";
import path from "path";
import { setupAutostart, startDaemon } from "./scheduler.js";

const program = new Command();

program
  .name("gitdrip")
  .description("Automatically commit and push changes to origin");

program
  .command("setup")
  .description("Setup Your api key and ssh key")
  .action(async () => {
    let newAPI = true;
    const apiKey = getApiKey();
    if (apiKey) {
      const { res } = await inquirer.prompt([
        {
          type: "confirm",
          name: "res",
          message:
            "A api key is already setup. Do you want to change the api key?",
          default: true,
        },
      ]);
      newAPI = res;
    }
    if (newAPI) {
      const { apiKey } = await inquirer.prompt([
        {
          type: "input",
          name: "apiKey",
          message: "Enter your OpenRouter API key.",
          validate: (input) => input.length > 0 || "No response",
        },
      ]);
      saveApiKey(apiKey);
      console.log("API key saved !");
    }

    let pubKeyPath = await checkSSH();

    if (!pubKeyPath) {
      pubKeyPath = await generateSshKey();
    } else {
      console.log(
        `SSH is already preset skipping its setup........ \nkey found at ${pubKeyPath}`
      );
      return;
    }
    console.log(pubKeyPath);

    if (pubKeyPath) {
      await setupSSHwithGitHub(pubKeyPath);
    }

    trustGitHost();
  });

program
  .command("push")
  .description("pushes current repo")
  .option("--all", "Push all managed repos")
  .action(async (opts) => {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error("Not a valid API Key Please run gitdrip setup first");
      process.exit(1);
    }
    if (opts.all) {
      await commitAndPushAll();
    } else {
      try {
        const apiKey = getApiKey();

        await commitAndPush(process.cwd(), apiKey);
      } catch (e) {
        console.error("error", e.message);
      }
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
    const girDir = path.join(repoPath, ".git");
    if (!fs.existsSync(girDir)) {
      console.error("Not a valid git repo");
      return;
    }
    addRepo(repoPath);
    console.log("Repo added");
  });

repo
  .command("remove [path]")
  .description("Remove managed paths")
  .option("--all", "Remove all managed repos")
  .action((repoPath, opts) => {
    if (opts.all) {
      const repos = getConfig().repos;
      repos.forEach(removeRepo);
      console.log("Removed all the mangaged repo");
    } else {
      removeRepo(repoPath);
      console.log("Removed repo");
    }
  });

repo
  .command("scan <dir>")
  .description("Scan for all git repo in a given directory and add them")
  .action(async (rootDir) => {
    if(!fs.existsSync(rootDir) || !fs.lstatSync(rootDir).isDirectory()){
      console.error("Directory does not exist");
      return;
    } else{
      addDir(rootDir);
    }
    scanDir(rootDir);  
    
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

program
  .command("daemon")
  .description("Run gitdrip in background")
  .action(() => {
    startDaemon();
  });

program
  .command("setup-autostart")
  .description("setup gitdrip to auto start on login ")
  .action(() => {
    setupAutostart();
    
  });

program.parse();
