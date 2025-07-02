import os from 'os';
import fs from 'fs'
import path from 'path';

const CONFIG_DIR = path.join(os.homedir(),'.gitdrip')
const CONFIG_PATH = path.join(CONFIG_DIR,'config.json');

export function ensureConfigDir(){
    if(!fs.existsSync(CONFIG_DIR)){
        fs.mkdirSync(CONFIG_DIR, {recursive: true});
    }
}

export function getConfig(){
    ensureConfigDir();
    if(!fs.existsSync(CONFIG_PATH)) return {repos: [], frequency : 1};
    return JSON.parse(fs.readFileSync(CONFIG_PATH,'utf-8'));
}

export function saveConfig(config){
    ensureConfigDir();
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}
