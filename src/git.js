import simpleGit from "simple-git";
import fs from 'fs';
import { generateCommitMsg } from "./ai.js";

async function getDiff(git) {
    const diff = await git.diff(['--cached','--','.',':(exclude)package-lock.json']);
    if(!diff){
        await git.add('.');
        return await git.diff(['--cached','--','.',':(exclude)package-lock.json']);
    }
    return diff;
}


export async function commitAndPush(repoPath, apiKey){
    const git = simpleGit(repoPath);
    const isRepo = await git.checkIsRepo();
    if(!isRepo){
        console.log("Not a git repo");
    }
    const diff = await getDiff(git);
    if(!diff.trim()){
        console.log('No changes to commit');
        return;
    }

    
    let commitMsg;
    try {
        commitMsg = await generateCommitMsg(diff,apiKey)
    } catch (e){
        console.error("Failed to generate commit messages",e.message);
    }
    await git.add('.');
    await git.commit(commitMsg);
    try {
        await git.push();
        console.log('Committed and pushed');
    } catch (e){
        console.error('Failed to push: ', e.message);
    }


}