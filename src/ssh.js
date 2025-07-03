import os from "os";
import inquirer from "inquirer";
import { execSync } from "child_process";
import path from "path";
import fs from "fs";
import { getOrigin } from "./git.js";
import simpleGit from "simple-git";

const osType = process.platform;
const sshDir = path.join(os.homedir(), ".ssh");

export async function checkSSH() {
  let pubKeyPath = path.join(sshDir, "id_rsa.pub");
  let privKeyPath = path.join(sshDir, "id_rsa");
  if (!fs.existsSync(pubKeyPath)) {
    pubKeyPath = path.join(sshDir, "id_ed25519.pub");
    privKeyPath = path.join(sshDir, "id_ed25519");
  }
  return fs.existsSync(pubKeyPath) ? pubKeyPath : null;
}

export async function generateSshKey() {
  console.log("No ssh key found. \n Generating new ssh key pair......");
  const default_email = os.userInfo().username + "@" + os.hostname();
  const { email } = await inquirer.prompt([
    {
      type: "input",
      name: "email",
      message:
        "Enter you email for SSH key (Use same email as you use in your github account",
      default: default_email,
    },
  ]);
  let keygenCmd = "";
  if (osType === "win32") {
    keygenCmd = `ssh-keygen -t ed25519 -C "${email}" -f "${sshDir}\\id_ed25519" -N ""`;
  } else {
    keygenCmd = `ssh-keygen -t ed25519 -C "${email}" -f "${sshDir}/id_ed25519" -N ""`;
  }

  try {
    execSync(keygenCmd, { stdio: "inherit" });
  } catch (e) {
    console.error("Failed to generate SSH key:", e.message);
  }

  return path.join(sshDir, "id_ed25519.pub");
}

export async function setupSSHwithGitHub(pubKeyPath) {
  const pubKey = fs.readFileSync(pubKeyPath, "utf-8");
  console.log(
    `You public key is \n ${pubKey} \n Copy it to paste it in Github`
  );

  let openCmd = "";
  if (osType === "linux") openCmd = "xdg-open";
  else if (osType === "darwin") openCmd = "open";
  else if (osType === "win32") openCmd = "start";

  if (openCmd) {
    try {
      execSync(`${openCmd} https://github.com/settings/keys`);
      console.log(
        "Opened Github SSH  key page in your browser \n Click on New SSH key\n Paste your public key in key setion"
      );
    } catch {
      console.log(
        "Please open https://github.com/settings/keys in you browser \n Click on New SSH key\n Paste your public key in key setion"
      );
    }
  } else {
    console.log(
      "Please open https://github.com/settings/keys in you browser \n Click on New SSH key\n Paste your public key in key setion"
    );
  }
}

export async function ConvertToSSH(repoPath) {
    const git = simpleGit(repoPath);
  try{
    const origin = await getOrigin(git);
  if (!origin) {
    console.log("no origin found");
    return;
  }

  const originUrl = origin.refs.fetch;

  if (!originUrl.startsWith("git@")) {
    const sshUrl =
      originUrl
        .replace(/^https:\/\/github\.com\//, "git@github.com:")
        .replace(/\.git$/, "") + ".git";

    await git.remote(["set-url","origin",sshUrl]);
    console.log(`Converted origin url to ssh formate: ${sshUrl}`);
  }
} catch(e){
    console.log("Error occured",e.message);
}
  }
