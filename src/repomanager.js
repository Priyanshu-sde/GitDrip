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