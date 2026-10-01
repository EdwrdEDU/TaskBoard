# TaskBoard

TaskBoard is a lightweight task management app with an Angular frontend and an ASP.NET Core Web API backend. Create tasks, set priorities and due dates, move tasks between columns, and delete completed work.

## Project Structure

- `task-board/` - Angular 21 frontend
- `TaskBoard.Api/` - ASP.NET Core 10 Web API with Entity Framework Core and SQLite

## Prerequisites

- Node.js and npm
- .NET SDK 10.0

## Run Locally

Start the API first:

```powershell
cd TaskBoard.Api
dotnet run --launch-profile http
```

The API runs at `http://localhost:5122`.

In a second terminal, start the Angular frontend:

```powershell
cd task-board
npm install
npm start
```

Open `http://localhost:4200` in a browser.

The frontend expects the API at `http://localhost:5122/api/tasks`.

## Features

- Create tasks with a title, description, priority, and due date
- View tasks in To Do, In Progress, and Done columns
- Move tasks between statuses
- Delete tasks
- Highlight overdue tasks
- Show task counts by status
- Display a centered loading spinner while tasks are loading

## Useful Commands

### Frontend

Run these commands from `task-board/`:

```powershell
npm start       # Start the development server
npm run build   # Create a production build
npm test        # Run frontend tests
```

### API

Run these commands from `TaskBoard.Api/`:

```powershell
dotnet run --launch-profile http
dotnet build
dotnet test
```

The SQLite database is configured by the API's application settings and migrations are stored in `TaskBoard.Api/Migrations/`.

## API Endpoints

All task endpoints use the `/api/tasks` route:

- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

## Development Notes

Run the API and frontend at the same time during development. If the frontend shows an API loading error, confirm that the API is running on port `5122`.
