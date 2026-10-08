# Daymark — To-Do List

A beginner-friendly Java full-stack task manager built to match the supplied project guide. The frontend and backend live in separate folders.

## Features

- Create, view, edit, delete, and complete tasks
- Filter by all, in-progress, and completed tasks
- Optional due dates, overdue indicators, and task descriptions
- Input validation, delete confirmation, loading and error states
- Responsive React interface
- Spring Boot REST API backed by MongoDB

## Requirements

- Java 21+
- Node.js 20+
- MongoDB 6+ (local or hosted)

The backend includes a project-local Maven wrapper, so Maven does not need to be installed system-wide.

## Start the backend

Open a VS Code terminal in `backend/` and start the local MongoDB server:

```powershell
.\start-mongodb.ps1
```

Keep that terminal open. In a second terminal, from `backend/` run:

```bash
./mvnw.cmd spring-boot:run
```

The first run downloads Maven and the backend dependencies. In PowerShell, use `.\mvnw.cmd spring-boot:run`.

By default the API connects to the local MongoDB server at `mongodb://localhost:27017/To-Do-List` and runs on `http://localhost:8080`. Tasks are stored in the `Tasks` collection. In MongoDB Compass, connect to `mongodb://localhost:27017` to view the database and collection after the app saves its first task. Set `MONGODB_URI` to override the local database URI, or `PORT` to change the port.

To override the local MongoDB connection, set the environment variable before starting the backend:

```powershell
$env:MONGODB_URI="mongodb://<username>:<password>@<cluster-host>:27017/<database>?ssl=true&replicaSet=<replicaSet>&authSource=admin&appName=<app-name>"
./mvnw.cmd spring-boot:run
```

The app reads `MONGODB_URI` in `backend/src/main/resources/application.properties`.

## Start the frontend

In another terminal, from `frontend/` run:

```bash
npm ci
npm run dev
```

Open `http://localhost:5173`. The API defaults to `http://localhost:8080/api`; set `VITE_API_URL` in a `frontend/.env.local` file to override it.

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/api/tasks` | List tasks |
| `POST` | `/api/tasks` | Create a task |
| `PUT` | `/api/tasks/{id}` | Update a task or its status |
| `DELETE` | `/api/tasks/{id}` | Delete a task |

Task payloads use `title`, `description`, `status` (`PENDING` or `COMPLETED`), and `dueDate` (`YYYY-MM-DD` or `null`).

## Deploy

### Backend on Render

This repository includes a `render.yaml` Blueprint and `backend/Dockerfile`. In Render, create a new Blueprint from this GitHub repository. Set these environment variables for the backend service:

- `MONGODB_URI`: your MongoDB Atlas URI, with the `To-Do-List` database in its path.
- `CORS_ALLOWED_ORIGINS`: the full Vercel site origin, for example `https://your-project.vercel.app`.

Keep credentials in Render's environment settings; do not commit them to this repository.

### Frontend on Vercel

Import this repository into Vercel and set the project Root Directory to `frontend`. Vercel will use the existing `npm run build` script and `dist` output. Set `VITE_API_URL` to the Render service URL followed by `/api`, for example `https://your-api.onrender.com/api`.

The frontend includes `vercel.json` to route client-side page requests to the React app. After deploying, copy the Vercel site origin into Render's `CORS_ALLOWED_ORIGINS` setting and redeploy the backend.
