
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

> Say goodbye to "final-final-fix-2" commits 😄

---

## 📦 Installation

```bash
npm install -g gitdrip
````

> Requires Node.js 18+

---

## 🔧 Setup

First, set your OpenRouter API key:

```bash
gitdrip setup
```

You'll be prompted to paste your API key.

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

## 🧠 How It Works

* Uses `simple-git` to interact with local repos
* Generates commit messages via OpenRouter + OpenAI models
* Diff is trimmed to 4000 characters to stay within token limits
* Stores configuration in `~/.gitdrip/config.json`

---

## 📚 Commands Summary

| Command                      | Description                       |
| ---------------------------- | --------------------------------- |
| `gitdrip setup`              | Set your OpenRouter API key       |
| `gitdrip push`               | Commit and push the current repo  |
| `gitdrip push --all`         | Commit and push all managed repos |
| `gitdrip repo add <path>`    | Add a single repo                 |
| `gitdrip repo remove [path]` | Remove a repo                     |
| `gitdrip repo remove --all`  | Remove all repos                  |
| `gitdrip repo scan <dir>`    | Scan a directory for Git repos    |
| `gitdrip repo list`          | Show all managed repos            |

---

## 📄 License

MIT © 2025 [Priyanshu Chaurasia](https://github.com/Priyanshu-sde)

---

## 💡 What's Next?

* [ ] Add `git pull` before commit option
* [ ] Support for `.gitignore` parsing
* [ ] Add support for `.gitdriprc` config overrides
* [ ] Custom AI model selection

---

## 🌟 Like the project?

* Leave a ⭐ on [GitHub](https://github.com/Priyanshu-sde/gitdrip)
* Share it on socials!
* Contribute or file issues to make it better 💥

