import simpleGit from "simple-git";
import { generateCommitMsg } from "./ai.js";
import { getConfig } from "./config.js";

async function getDiff(git) {
  const diff = await git.diff([
    "--cached",
    "--",
    ".",
    ":(exclude)package-lock.json",
  ]);
  if (!diff) {
    await git.add(".");
    return await git.diff([
      "--cached",
      "--",
      ".",
      ":(exclude)package-lock.json",
    ]);
  }
  return diff;
}

export async function getOrigin(git) {
  const remotes = await git.getRemotes(true);
  const origin = remotes.find((r) => r.name === "origin");
  return origin;
}

export async function commitAndPush(repoPath, apiKey) {
  const git = simpleGit(repoPath);
  const isRepo = await git.checkIsRepo();
  if (!isRepo) {
    console.log("Not a git repo");
  }
  const diff = await getDiff(git);
  if (!diff.trim()) {
    console.log("No changes to commit");
    return;
  }

  let commitMsg;
  try {
    commitMsg = await generateCommitMsg(diff, apiKey);
  } catch (e) {
    console.error("Failed to generate commit messages", e.message);
  }
  await git.add(".");
  await git.commit(commitMsg);
  try {
    await git.push();
    console.log(`Committed and pushed ${repoPath}`);
  } catch (e) {
    if (e.message.includes("No configured push destination.")) {
      console.log("The repo doesn't have an origin");
    }
    if (e.message.includes("Permission denied (publickey)")) {
      console.log(
        "SSH Authentication failed \nAdd you public key to github \n run gitdrip setup"
      );
    } else {
      console.error("Failed to push: ", e.message);
    }
  }
}

export async function commitAndPushAll() {
  const repos = getConfig().repos;
  for (const r of repos) {
    try {
      console.log(`Scanning ${r}`);
      await commitAndPush(r, apiKey);
    } catch (e) {
      console.log("erro occured:", e.message);
    }
  }
}
