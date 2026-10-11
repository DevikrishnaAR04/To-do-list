# MERN To-Do List

A full-stack To-Do List built with **MongoDB, Express.js, React (Vite) and Node.js**.
Tasks are stored in MongoDB, served through a REST API, and managed from a React UI
without any page reloads.

Course: 23CSB40B Web Technology, Assignment 2, MBCET Thiruvananthapuram

## Features
- Add, view, complete/incomplete, edit (double-click a title) and delete tasks
- Data persists in MongoDB across refreshes
- Input validation (empty titles rejected with HTTP 400)
- CORS restricted to the frontend's address

## Project structure
```
backend/
  server.js          Express app, CORS, MongoDB connection
  models/Task.js     Mongoose schema (title, completed, createdAt)
  routes/tasks.js    GET / POST / PUT / DELETE endpoints
  .env.example       Variable names (copy to .env)
frontend/
  src/App.jsx        State, useEffect fetch, handlers
  src/api.js         fetch calls to the backend
  src/components/    TaskForm, TaskList, TaskItem
screenshots/         Screenshots of the working app and merged PRs
```

## Prerequisites
- Node.js 18+ and npm
- MongoDB running locally **or** a free MongoDB Atlas cluster

## How to run

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env      # Windows: copy .env.example .env
```
Edit `.env`:
```
MONGO_URI=mongodb://127.0.0.1:27017/todo-app     # or your Atlas connection string
PORT=5000
CLIENT_ORIGIN=http://localhost:3000
```
Start the server:
```bash
npm start
```
You should see `MongoDB connected` and `Server running on http://localhost:5000`.

### 2. Frontend (new terminal)
```bash
cd frontend
npm install
npm start
```
Open http://localhost:3000

## Environment variables
| Variable | Where | Meaning |
|---|---|---|
| `MONGO_URI` | backend/.env | MongoDB connection string (required) |
| `PORT` | backend/.env | API port (default 5000) |
| `CLIENT_ORIGIN` | backend/.env | The only origin allowed by CORS (default http://localhost:3000) |
| `VITE_API_URL` | frontend/.env (optional) | API base URL (default http://localhost:5000/api/tasks) |

## API reference
| Method | Endpoint | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/api/tasks` | | 200 + array | 500 |
| POST | `/api/tasks` | `{ "title": "..." }` | 201 + task | 400 empty title |
| PUT | `/api/tasks/:id` | `{ "title"?, "completed"? }` | 200 + task | 400 empty title, 404 not found |
| DELETE | `/api/tasks/:id` | | 200 + message | 404 not found |

## Screenshots
![Add task](screenshots/1-add-task.png)
![Complete task](screenshots/2-complete-task.png)
![Delete task](screenshots/3-delete-task.png)
![Merged pull requests](screenshots/4-merged-prs.png)

## Author
Name: Devi Krishna A R, Roll No: 25
