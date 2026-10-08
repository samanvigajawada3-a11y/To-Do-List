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

The API reads its MongoDB connection string from the `MONGODB_URI` environment variable and runs on `http://localhost:8080` by default. Tasks are stored in the `Tasks` collection. Supply `MONGODB_URI` in the backend environment for local runs, or as a Render environment variable after deployment.

The app requires `MONGODB_URI` and reads it in `backend/src/main/resources/application.properties`. Keep the connection string in an environment variable or your hosting provider's secret settings, not in source files.

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

This repository includes a `render.yaml` Blueprint and `backend/Dockerfile`. In Render, create a new Blueprint from this GitHub repository. If configuring the Docker service manually, leave Root Directory blank, set Dockerfile Path to `backend/Dockerfile`, and set Docker Context to `.` (the repository root). Set these environment variables for the backend service:

- `MONGODB_URI`: your MongoDB Atlas URI, with the `To-Do-List` database in its path.
- `CORS_ALLOWED_ORIGINS`: the full Vercel site origin, for example `https://your-project.vercel.app`.

Keep credentials in Render's environment settings; do not commit them to this repository.

### Frontend on Vercel

Import this repository into Vercel and set the project Root Directory to `frontend`. Vercel will use the existing `npm run build` script and `dist` output. Set `VITE_API_URL` to the Render service URL followed by `/api`, for example `https://your-api.onrender.com/api`.

The frontend includes `vercel.json` to route client-side page requests to the React app. After deploying, copy the Vercel site origin into Render's `CORS_ALLOWED_ORIGINS` setting and redeploy the backend.
