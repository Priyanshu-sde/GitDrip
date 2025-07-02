import fs from 'fs';
import { getConfig, saveConfig } from './config.js';

export function addRepo(repoPath){
    const config = getConfig();
    if(!config.repos.includes(repoPath)){
        config.repos.push(repoPath);
        saveConfig(config);
    }
}