import { commitAndPushAll } from "./git.js";
import { ensureConfigDir, getApiKey, getFrequency, getPidFile, logEntry } from "./config.js";
import fs from "fs";
import os from 'os';
import path from 'path';



export async function startDaemon() {
  ensureConfigDir();
  const pidFile = getPidFile();
  if (fs.existsSync(pidFile)) {
    const pid = fs.readFileSync(pidFile, "utf-8");
    try {
      process.kill(Number(pid), 0);
      console.log("gitdrip daemod is already running");
      process.exit(0);
    } catch {
      fs.unlinkSync(pidFile);
    }
  }
  fs.writeFileSync(pidFile, String(process.pid));
  process.on("exit", () => {
    if (fs.existsSync(pidFile)) fs.unlinkSync(pidFile);
  });

  const apiKey = getApiKey();
  if (!apiKey) {
    console.error("Not a valid API Key Please run gitdrip setup first");
    process.exit(1);
  }

  const freq = getFrequency();
  const interval = freq * 3600000;
  logEntry(`gitdrip daemon started. will commit and push code every ${freq} hour`);
  await commitAndPushAll(apiKey);

  setInterval(() => {
    logEntry("Trigerring scheduled commit and push");
    commitAndPushAll(apiKey);
  },interval);

}

export function setupAutostart() {
    const platform = process.platform;
    if (platform === 'linux') {
        const service = `[Unit]\nDescription=gitdrip daemon\nAfter=network.target\n\n[Service]\nType=simple\nExecStart=${process.execPath} ${process.argv[1]} daemon\nRestart=on-failure\nUser=${os.userInfo().username}\nEnvironment=PATH=${process.env.PATH}\n\n[Install]\nWantedBy=default.target\n`;
        const systemdDir = path.join(os.homedir(), '.config', 'systemd', 'user');
        if (!fs.existsSync(systemdDir)) fs.mkdirSync(systemdDir, { recursive: true });
        const servicePath = path.join(systemdDir, 'gitdrip.service');
        fs.writeFileSync(servicePath, service);
        console.log('Systemd user service file created at:', servicePath);
        console.log('To enable and start on login, run:');
        console.log('  systemctl --user daemon-reload');
        console.log('  systemctl --user enable --now gitdrip.service');
        console.log('To check status: systemctl --user status gitdrip.service');
      } else if (platform === 'darwin') {
        console.log('For macOS, create a LaunchAgent plist in ~/Library/LaunchAgents to run:');
        console.log(`  ${process.execPath} ${process.argv[1]} daemon`);
        console.log('See: https://developer.apple.com/library/archive/documentation/MacOSX/Conceptual/BPSystemStartup/Chapters/CreatingLaunchdJobs.html');
      } else if (platform === 'win32') {
        console.log('For Windows, use Task Scheduler to run:');
        console.log(`  ${process.execPath} ${process.argv[1]} daemon`);
        console.log('See: https://learn.microsoft.com/en-us/windows/win32/taskschd/about-the-task-scheduler');
      } else {
        console.log('Auto-start not supported for this OS.');
      }
}
