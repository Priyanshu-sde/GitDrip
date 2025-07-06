<h1 align="center">🚀 gitdrip</h1>
<p align="center">
  <strong>Automatically commit and push code with AI-generated messages</strong><br>
  🧠 Powered by OpenRouter · 🛠️ Made with Node.js
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/gitdrip"><img src="https://img.shields.io/npm/v/gitdrip?color=blue&label=npm&style=flat-square" alt="npm version"></a>
  <img src="https://img.shields.io/badge/made%20by-priyanshu-blueviolet?style=flat-square">
  <img src="https://img.shields.io/badge/openrouter-powered-brightgreen?style=flat-square">
</p>

---

## ✨ What is `gitdrip`?

**`gitdrip`** is a lightweight CLI tool that:
- Auto-stages your Git changes
- Uses AI to generate clean commit messages based on your `git diff`
- Pushes commits to the remote repo
- Supports managing and pushing multiple repositories at once
- Stores your OpenRouter API key securely
- **NEW**: SSH key generation and GitHub integration
- **NEW**: Background daemon mode for automatic commits
- **NEW**: Auto-start setup for system integration

> Say goodbye to "final-final-fix-2" commits 😄

---

## 📦 Installation

```bash
npm install -g gitdrip
```

> Requires Node.js 18+

---

## 🔧 Setup

First, set your OpenRouter API key and SSH configuration:

```bash
gitdrip setup
```

This will:
- Prompt for your OpenRouter API key
- Generate SSH keys if not present
- Open GitHub SSH settings page in your browser
- Trust GitHub's SSH host

---

## 🚀 Usage

### 🔁 Push Current Repo with AI Commit

```bash
gitdrip push
```

Stages all changes, generates an AI commit message, and pushes to origin.

---

### 🔁 Push All Tracked Repos

```bash
gitdrip push --all
```

Loops through all added repos and performs the same commit + push operation.

---

## 📂 Repo Management

Use the `repo` namespace to manage your tracked repositories:

### ➕ Add a Repo

```bash
gitdrip repo add /path/to/repo
```

Adds a single Git repo to be managed.

---

### 🔍 Scan and Add All Git Repos in a Directory

```bash
gitdrip repo scan /path/to/parent-folder
```

Recursively finds all `.git` folders and adds them as managed repos.

---

### 🧹 Remove a Repo

```bash
gitdrip repo remove /path/to/repo
```

Removes a single repo from the managed list.

---

### 🔥 Remove All Managed Repos

```bash
gitdrip repo remove --all
```

Clears the list of all managed repos.

---

### 📋 List All Managed Repos

```bash
gitdrip repo list
```

Displays all currently tracked repositories.

---

## 🔄 Background Operations

### 🖥️ Run Daemon Mode

```bash
gitdrip daemon
```

Runs gitdrip in the background, automatically committing and pushing changes every 6 hours (configurable).

---

### 🚀 Setup Auto-Start

```bash
gitdrip setup-autostart
```

Sets up gitdrip to automatically start on system login:

- **Linux**: Creates a systemd user service
- **macOS**: Provides instructions for LaunchAgent setup
- **Windows**: Provides instructions for Task Scheduler setup

---

## 🧠 How It Works

* Uses `simple-git` to interact with local repos
* Generates commit messages via OpenRouter + OpenAI models
* Diff is trimmed to 4000 characters to stay within token limits
* Stores configuration in `~/.gitdrip/config.json`
* **NEW**: Automatically generates and configures SSH keys for GitHub
* **NEW**: Background daemon runs scheduled commits every 6 hours
* **NEW**: System integration for auto-start on login

---

## 📚 Commands Summary

| Command                      | Description                       |
| ---------------------------- | --------------------------------- |
| `gitdrip setup`              | Set your OpenRouter API key & SSH |
| `gitdrip push`               | Commit and push the current repo  |
| `gitdrip push --all`         | Commit and push all managed repos |
| `gitdrip daemon`             | Run gitdrip in background mode    |
| `gitdrip setup-autostart`    | Setup auto-start on system login  |
| `gitdrip repo add <path>`    | Add a single repo                 |
| `gitdrip repo remove [path]` | Remove a repo                     |
| `gitdrip repo remove --all`  | Remove all repos                  |
| `gitdrip repo scan <dir>`    | Scan a directory for Git repos    |
| `gitdrip repo list`          | Show all managed repos            |

---

## 🔧 Configuration

### Daemon Frequency

The daemon runs every 6 hours by default. You can modify this by editing `~/.gitdrip/config.json`:

```json
{
  "repos": ["/path/to/repo1", "/path/to/repo2"],
  "frequency": 6
}
```

### Logs

Daemon logs are stored in `~/.gitdrip/gitdrip.log` for monitoring background operations.

---

## 📄 License

MIT © 2025 [Priyanshu Chaurasia](https://github.com/Priyanshu-sde)

---

## 💡 What's Next?

* [ ] Add `git pull` before commit option
* [ ] Support for `.gitignore` parsing
* [ ] Add support for `.gitdriprc` config overrides
* [ ] Custom AI model selection
* [ ] Webhook notifications for failed commits
* [ ] Branch-specific commit strategies

---

## 🌟 Like the project?

* Leave a ⭐ on [GitHub](https://github.com/Priyanshu-sde/gitdrip)
* Share it on socials!
* Contribute or file issues to make it better 💥

