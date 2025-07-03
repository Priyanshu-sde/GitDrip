import fs from 'fs';
import { getConfig, saveConfig } from './config.js';

export function addRepo(repoPath){
    const config = getConfig();
    if(!config.repos.includes(repoPath)){
        config.repos.push(repoPath);
        saveConfig(config);
    }
} export function removeRepo(repoPath) {
    const config = getConfig();
    config.repos = config.repos.filter(r => r !== repoPath);
    saveConfig(config);
}