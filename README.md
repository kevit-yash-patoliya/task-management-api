# Task Management API

A robust Task Management REST API built with Express, TypeScript, and MongoDB, running on the fast [Bun](https://bun.sh/) runtime.

## Features

- **TypeScript** - Strongly typed and organized codebase.
- **MongoDB & Mongoose** - Data persistence with robust schema validation.
- **Swagger Documentation** - Auto-generated and interactive API documentation.
- **Winston Logger** - Structured logging with console and file transports.
- **Linting & Formatting** - Fully configured with ESLint 9 (Flat Config) and Prettier.
- **Advanced Querying** - Pagination and filtering built into the API endpoints.

## Prerequisites

- [Bun](https://bun.sh/)
- [MongoDB](https://www.mongodb.com/) (running locally or via MongoDB Atlas)

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Environment Variables

Create a `.env` file in the root directory and configure your settings:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mydatabase
DB_NAME=mydatabase
LOG_LEVEL=info
```

### 3. Running the Project

**Development Mode (with auto-reload):**
```bash
bun run start:dev
```

**Build & Run Production:**
```bash
bun run build
bun run start
```

## API Documentation

Once the server is running, you can explore the endpoints and test the API using the interactive Swagger UI at:

👉 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

## Available Scripts

- `bun run start:dev` - Starts the development server with `nodemon`.
- `bun run build` - Compiles the TypeScript code into the `dist/` directory.
- `bun run start` - Builds the project and runs the compiled output.
- `bun run lint` - Checks the codebase for ESLint warnings/errors.
- `bun run lint:fix` - Automatically fixes resolveable ESLint errors.
- `bun run format` - Formats all source files using Prettier.

## Project Structure

```text
src/
├── index.ts                 # Application entry point
├── swagger.ts               # Swagger UI configuration
├── config/                  
│   └── db.ts                # Database connection setup
├── middleware/              
│   └── request.logger.ts    # Custom request logging middleware
├── modules/                 
│   ├── route.ts             # Main router
│   ├── tasks/               # Tasks feature module (routes, controllers, service)
│   └── users/               # Users feature module
└── utils/                   
    ├── logger.ts            # Winston logger setup
    ├── enums/               # Shared enums (e.g., Task Priority, Status)
    └── error.utils.ts       # Error handling utilities
```
