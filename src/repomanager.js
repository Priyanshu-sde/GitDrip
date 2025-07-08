import fs from 'fs';
import { getConfig, saveConfig } from './config.js';
import { ConvertToSSH } from './ssh.js';

export function addRepo(repoPath){
    const config = getConfig();
    if(!config.repos.includes(repoPath)){
        ConvertToSSH(repoPath);
        config.repos.push(repoPath);
        saveConfig(config);
    }
} export function removeRepo(repoPath) {
    const config = getConfig();
    config.repos = config.repos.filter(r => r !== repoPath);
    saveConfig(config);
}

export function addDir(rootDir) {
    const config = getConfig();
    if(!config.dirs.includes(rootDir)){
        config.dirs.push(rootDir);
        saveConfig(config);
    }
}

export async function scanDir(rootDir){
    const { default: fg } = await import("fast-glob");
        const path = await fg(["**/.git"], {
          cwd: rootDir,
          onlyDirectories: true,
          absolute: true,
        });
        const repoPath = path.map((p) => p.replace(/\/\.git$/, ""));
        let added = 0;
        repoPath.forEach((p) => {
          addRepo(p);
          added++;
        });
        console.log(`Added ${added} repo`);
}