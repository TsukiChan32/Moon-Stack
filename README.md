# Moon Stack 🌙

Moon Stack is an easy-to-use full-stack TypeScript template for building web apps.

It combines a modern React frontend, Express backend, Prisma, PostgreSQL, and a small interactive CLI — without trying to become a framework.

## What's included?

### Frontend

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS

### Backend

- Express
- Prisma
- PostgreSQL

### Developer Experience

- Interactive project setup
- Automatic dependency installation
- Automatic Prisma Client generation
- Optional Git initialization
- Frontend and backend with a single command
- Windows and Linux support

## Getting Started

Create a new Moon Stack app:

```bash
npm create moon-stack@latest
```

The CLI will guide you through the setup.

After creating your project:

```bash
cd my-app
npm run dev
```

This starts both the frontend and backend:

- Frontend — `http://localhost:5173`
- Backend — `http://localhost:3000`

## Database

Moon Stack creates a `.env` file from `.env.example`.

Configure your PostgreSQL connection:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/moon"
```

Then create and apply your database migration:

```bash
npm run db:migrate
```

To open Prisma Studio:

```bash
npm run db:studio
```

## Commands

```bash
npm run dev          # Start frontend + backend
npm run dev:frontend # Start Vite only
npm run dev:server   # Start Express only

npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Create/apply migrations
npm run db:studio    # Open Prisma Studio

npm run build        # Build the app
npm run lint         # Run the linter
```

## Philosophy

Moon Stack is a stack, not a framework.

It doesn't reinvent routing, databases, styling, or APIs. It brings together tools that already do those jobs well and provides a convenient starting point for TypeScript web apps.

Use what you want. Replace what you don't.

Happy hacking under the moon 🌙