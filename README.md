# Todo List App - Scalable Web Architecture

## Project Description

This is a simple Todo List web application with:
- Frontend: React + TailwindCSS
- Backend: C# ASP.NET Minimal APIs
- Both frontend and backend are split into separate folders: `/frontend` and `/backend`

## Features

- Add tasks with title and description
- Mark tasks as Important (🚩 flag)
- Mark tasks as Done ✅
- Cancel Done ❌ (undo completed task)
- Toggle "Show Important Only" filter
- Feature toggle (important feature can be disabled by environment variable)
- Rollback safe through Git tags (v1, v2, v3, v4, v5)

## Deployment and Automation

- Manual simple deployment (acceptable for university assignment)
- Small frequent Git releases using tags
- Fast rollback by switching Git tags

## How to Run

1. Open `/backend` in Visual Studio
2. Run backend (Swagger should open)
3. Open `/frontend` in Visual Studio Code
4. Run frontend:

```bash
npm install
npm start

Open localhost:3000 to use the app

Scale Axes
Split by frontend and backend (X-axis scaling)

Future: possible horizontal scaling by replicating services (Z-axis)

CALMR Principles Achieved
Culture: Clean code, frequent commits

Automation: Git version control

Lean Flow: Small batch sizes (v1, v2, v3, ...)

Measurement: Version testing

Recovery: Easy rollback with Git tags
