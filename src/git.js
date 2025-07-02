import simpleGit from "simple-git";
import fs from 'fs';

async function getDiff(git) {
    const diff = await git.diff(['--cached']);
    if(!diff){
        await git.add('.');
        return await git.diff(['--cached'])
    }
    return diff;
}


export async function commitAndPush(repoPath){
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

    await git.add('.');
    await git.commit("test commit from gitdrip");
    try {
        await git.push();
        console.log('Committed and pushed');
    } catch (e){
        console.error('Failed to push: ', e.message);
    }


}