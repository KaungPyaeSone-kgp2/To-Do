# Project To-Do

A comprehensive task management application built with React and Express.js, following professional full-stack development patterns with a focus on code quality, separation of concerns, and maintainability.

## Features
- **Task Management**: Create, read, update, and delete tasks.
- **State Management**: Uses React Hooks for clean state management.
- **Routing**: Client-side routing with React Router.
- **Error Handling**: Global error boundaries and user-friendly error messages.
- **Persistence**: Data is stored in memory and automatically reset on server restart.
- **Styling**: Clean, modern UI with CSS custom properties and utility classes.

## Tech Stack
### Frontend
- **React**: UI library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Lucide React**: Icon library.

### Backend
- **Express.js**: Web framework for building the API.
- **Node.js**: Runtime environment.
- **ESLint**: Code quality and linting.

## Prerequisites
- Node.js (v14 or higher)
- npm (or yarn/pnpm)

## Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd To-Do
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Start the backend server:
```bash
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## Project Structure
```
To-Do/
├── backend/          # Express.js API server
│   ├── src/
│   │   ├── config/   # Configuration files
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Express middleware
│   │   ├── models/      # Mongoose models (if applicable)
│   │   ├── routes/      # API route definitions
│   │   ├── utils/       # Utility functions
│   │   ├── app.js       # Express application setup
│   │   └── server.js    # Server entry point
│   └── package.json
│
├── frontend/         # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── App.jsx      # Root component
│   │   └── main.jsx     # Entry point
│   └── package.json
│
├── README.md         # Project documentation
└── .gitignore        # Git ignore rules
```

## Environment Variables

### Backend
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
NODE_ENV=development
```

### Frontend
No environment variables are required for basic setup.

## Development

### Running in Development Mode

**Backend**: 
```bash
npm run dev
```

**Frontend**: 
```bash
npm run dev
```

### Running Tests

**Backend**: 
```bash
npm test
```

**Frontend**: 
```bash
npm test
```

## Production

To build the frontend for production:
```bash
cd frontend
npm run build
```

To run the backend in production mode:
```bash
cd backend
npm start
```

## Coding Standards

The project follows these coding standards:
- **Variable Naming**: camelCase for variables and functions, PascalCase for components.
- **File Naming**: kebab-case for component files, camelCase for hooks and utilities.
- **Imports**: Grouped imports (React, Node modules, local modules).
- **Comments**: Meaningful JSDoc comments for complex logic.

## File Organization

### Backend
The backend follows a domain-driven structure:
```
src/
├── controllers/    # Business logic
├── routes/         # Route definitions
├── models/         # Data models
└── middleware/     # Cross-cutting concerns
```

### Frontend
The frontend follows a component-based architecture:
```
src/
├── components/     # UI components
├── pages/          # Page-level components
├── services/       # API interactions
└── contexts/       # React Context providers
```

## API Documentation

The backend exposes the following API endpoints:

### Tasks
- `GET /api/todos` - Get all tasks
- `GET /api/todos/:id` - Get a single task
- `POST /api/todos` - Create a new task
- `PUT /api/todos/:id` - Update a task
- `PATCH /api/todos/:id` - Partially update a task
- `DELETE /api/todos/:id` - Delete a task

## Error Handling

The application uses a centralized error handling strategy:
- **Backend**: `ApiError` class and `errorHandler` middleware.
- **Frontend**: `ErrorBoundary` component and global error boundaries.

## Troubleshooting

### Common Issues
1. **Port already in use**:
   ```bash
   # Kill the process
   kill -9 <process_id>
   # Or change the port in .env file
   ```

2. **Dependencies not installed**:
   ```bash
   npm install
   ```

3. **CORS issues**:
   - Ensure the backend is running on `http://localhost:5000`
   - Check CORS configuration in `backend/src/app.js`

4. **Build errors**:
   ```bash
   # Clear cache and rebuild
   npm run build -- --watch
   ```

## License
This project is licensed under the terms of the MIT license. See [LICENSE](LICENSE) for details.