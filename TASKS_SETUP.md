# CampusCraft Tasks Section - Setup Guide

## Quick Start

This guide will get the tasks section fully working and connected to the backend API.

### Prerequisites
- Node.js (v16+) installed
- MongoDB running locally (or update `.env` with your MongoDB URI)

### Installation & Setup

#### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

#### 2. Configure Environment Variables

Backend `.env` file is already created at `backend/.env`:
```
MONGODB_URI=mongodb://localhost:27017/campuscraft
PORT=5000
CLIENT_URL=http://localhost:3000
JWT_SECRET=campuscraft-secret-dev-key-change-in-production
```

Frontend `.env.local` file is already created at `frontend/.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### 3. Seed the Database

```bash
# From project root or backend directory
npm run seed --prefix backend
# OR
cd backend && npm run seed
```

This will create:
- 2 test users (client & contributor)
- 3 sample tasks
- Sample submissions & notifications
- Sample messages

#### 4. Start Development Servers

```bash
# From project root - runs both frontend and backend in parallel
npm run dev

# OR run them separately:

# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`  
The backend will be running at `http://localhost:5000/api`

### Accessing the Tasks Section

1. Navigate to `http://localhost:3000/tasks`
2. You should see the task marketplace with sample tasks loaded from the backend
3. Click on any task to view its details
4. All components are now fully functional with backend integration

### Testing

To verify everything is working:

1. **Check Backend Connection**: Visit `http://localhost:5000/api/health`
   - Should return `{ "status": "ok", "timestamp": "..." }`

2. **Check Tasks API**: Visit `http://localhost:5000/api/tasks`
   - Should return tasks in JSON format

3. **Check Frontend**: 
   - Tasks page should load and display all tasks
   - Category filters should work
   - Search functionality should work
   - Clicking a task should show full details

### What's Been Updated

✅ **Frontend** (`src/lib/api.ts`):
- Enhanced API fetcher with timeout handling
- Fallback to mock data if backend fails
- Better error handling with graceful degradation

✅ **Tasks Page** (`src/app/tasks/page.tsx`):
- Connected to backend via `useTasks()` hook
- Real-time category filtering
- Search integration
- Loading & error states
- Skeleton loaders while fetching

✅ **Task Detail Page** (`src/app/tasks/[id]/page.tsx`):
- Connected to backend via `useTask()` hook
- Dynamic status and priority badges
- Safe null checks for client data
- Proper loading states

✅ **Backend** (`server.js`, `routes/tasks.js`):
- Already configured with proper routes
- Task model with all required fields
- Filtering and pagination support

### Database Schema

The Task model includes:
- `title`, `description`, `requirements`
- `category`, `tags`, `budget`, `deadline`
- `priority`, `status`, `visibility`
- `client` (reference to User)
- `submissionCount`, `maxWinners`
- `attachments`
- Timestamps (createdAt, updatedAt)

### Troubleshooting

**Tasks not loading?**
- Check MongoDB is running: `mongod --version` and verify connection
- Check backend is running: `http://localhost:5000/api/health`
- Check frontend `.env.local` has correct API URL
- Check browser console for errors

**Backend won't start?**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check port 5000 is not in use
- Verify MongoDB connection string in `.env`

**Seed fails?**
- Ensure MongoDB is running
- Check `.env` has correct MONGODB_URI
- Try: `mongosh` to test direct connection

### Next Steps

- Add authentication integration
- Create task submission form
- Add payment processing
- Implement real-time notifications
- Add user profiles and ratings
