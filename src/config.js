import os from 'os';
import fs from 'fs'
import path from 'path';

const CONFIG_DIR = path.join(os.homedir(),'.gitdrip')
const CONFIG_PATH = path.join(CONFIG_DIR,'config.json');
const envPath = path.join(CONFIG_DIR,'.env');


export function saveApiKey(apiKey) {

    ensureConfigDir();

    let envContent = '';
    if(fs.existsSync(envPath)){
        envContent = fs.readFileSync(envPath,'utf-8');
        envContent = envContent.replace(/^OPENROUTER_API_KEY=.*$/m,'');
    }
    envContent += `\nOPENROUTER_API_KEY=${apiKey}\n`;
    fs.writeFileSync(envPath,envContent.trim() + '\n');
}

export function getApiKey() {
    if(!fs.existsSync(envPath)) return null;
    const envContent = fs.readFileSync(envPath,'utf-8');
    const match = envContent.match(/^OPENROUTER_API_KEY=(.*)$/m);
    return match ? match[1] : null;
}

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
