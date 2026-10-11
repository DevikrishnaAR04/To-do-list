# GitHub Guide (Part C): step by step

Do NOT commit directly to main. Follow this order so the history looks right.
Delete this file from the zip if you do not want it, or keep it, it is harmless.

## 0. One-time setup
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```
Create an EMPTY public repo on github.com (New repository -> Public -> do NOT tick
"Add README"), e.g. `mern-todo-list`. Copy its URL.

## 1. Initialise and make the first commit on main (only the base files)
Put the project in a folder, then from the project root (the folder that holds
backend/ and frontend/):
```bash
git init
git branch -M main
git add .gitignore README.md screenshots/README.txt
git commit -m "Initial commit: add .gitignore, README and screenshots folder"
git remote add origin https://github.com/<your-username>/mern-todo-list.git
git push -u origin main
```
(main needs at least one commit so a pull request has something to merge into.)

## 2. Backend on feature/backend (several small commits)
```bash
git checkout -b feature/backend

git add backend/package.json backend/.gitignore backend/.env.example
git commit -m "Initialise Node project and add .env.example"

git add backend/models/Task.js
git commit -m "Add Task model"

git add backend/server.js
git commit -m "Add Express server with MongoDB connection and restricted CORS"

git add backend/routes/tasks.js
git commit -m "Add GET, POST, PUT and DELETE task endpoints with validation"

git push -u origin feature/backend
```
Tip: if you want more commits, build one route at a time ("Add GET endpoint",
"Add DELETE endpoint").

## 3. Pull request #1 for the backend
On GitHub, click **Compare & pull request** (banner appears after the push).
Base: `main`, compare: `feature/backend`. Title: "Add backend API". Click
**Create pull request**, then **Merge pull request**, then **Confirm merge**.

## 4. Update local main, then frontend branch
```bash
git checkout main
git pull origin main
git checkout -b feature/frontend

git add frontend/package.json frontend/vite.config.js frontend/index.html frontend/.gitignore frontend/.env.example
git commit -m "Set up React app with Vite"

git add frontend/src/api.js
git commit -m "Add API helper functions"

git add frontend/src/components
git commit -m "Add TaskForm, TaskList and TaskItem components"

git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/App.css
git commit -m "Connect App to backend and add styling"

git push -u origin feature/frontend
```

## 5. Pull request #2 for the frontend
Same as step 3 but compare `feature/frontend` into `main`. Merge it.

## 6. Final touches (also via a branch, not directly on main)
After taking your screenshots:
```bash
git checkout main
git pull origin main
git checkout -b docs/screenshots
git add screenshots README.md
git commit -m "Add screenshots and finalise README"
git push -u origin docs/screenshots
```
Open a PR, merge it. (Optional but safe: it keeps the "no direct commits to main" rule.)

## 7. Verify
- Repo is **Public** (Settings -> General -> bottom, Danger Zone)
- `.env` does NOT appear in the file list; `.env.example` does
- Commits tab shows 5+ commits with clear messages
- Pull requests -> **Closed** tab shows the merged PRs: take the screenshot
  and save it as `screenshots/4-merged-prs.png`
- Branches page lists `feature/backend` and `feature/frontend`
  (do not delete them after merging)

## Common problems
- **Pushed .env by mistake?** Remove it with `git rm --cached backend/.env`, commit,
  and change your database password immediately (it is in the history).
- **Authentication failed on push?** GitHub no longer accepts passwords. Use a
  Personal Access Token (Settings -> Developer settings -> Tokens) or GitHub Desktop /
  `gh auth login`.
- **"No commits between main and feature/..."** means you forgot to commit, or the
  branch was created from the wrong place.
- Deadline: commits after 11 Oct 2026 are not counted.
