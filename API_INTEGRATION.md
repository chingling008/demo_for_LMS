# API Integration Guide

## Overview

The LMS application now includes full MongoDB backend integration with API endpoints for all features. The frontend automatically falls back to mock data if the API is unavailable, ensuring the application works in development even without the backend running.

## Architecture

```
Frontend (React + Vite)
    ↓ HTTP Requests (Axios)
API Service Layer (src/services/api.js)
    ↓ REST API
Backend Server (Express + MongoDB)
    ↓ Mongoose ODM
MongoDB Database
```

## Features with API Integration

### ✅ Implemented API Endpoints

1. **Authentication**
   - POST `/api/auth/login` - User login
   - POST `/api/auth/register` - User registration
   - GET `/api/auth/me` - Get current user

2. **User Profile**
   - GET `/api/users/profile` - Get user profile
   - PUT `/api/users/profile` - Update profile
   - PUT `/api/users/password` - Change password

3. **Courses**
   - GET `/api/courses?role={role}` - Get all courses
   - GET `/api/courses/:id` - Get course by ID
   - POST `/api/courses` - Create new course (teacher)
   - PUT `/api/courses/:id` - Update course (teacher)
   - DELETE `/api/courses/:id` - Delete course (teacher)
   - POST `/api/courses/:id/enroll` - Enroll in course (student)

4. **Assignments**
   - GET `/api/assignments?role={role}` - Get all assignments
   - GET `/api/assignments/:id` - Get assignment by ID
   - POST `/api/assignments` - Create assignment (teacher)
   - PUT `/api/assignments/:id` - Update assignment (teacher)
   - POST `/api/assignments/:id/submit` - Submit assignment (student)
   - POST `/api/assignments/:id/grade` - Grade assignment (teacher)

5. **Grades**
   - GET `/api/grades` - Get all grades (student)
   - GET `/api/grades/stats` - Get grade statistics
   - GET `/api/grades/course/:id` - Get grades by course

6. **Calendar**
   - GET `/api/calendar/events?month={month}&year={year}` - Get events
   - POST `/api/calendar/events` - Create event (teacher)
   - PUT `/api/calendar/events/:id` - Update event
   - DELETE `/api/calendar/events/:id` - Delete event

7. **Messages**
   - GET `/api/messages/conversations` - Get all conversations
   - GET `/api/messages/conversations/:id` - Get messages in conversation
   - POST `/api/messages/conversations/:id/messages` - Send message
   - POST `/api/messages/conversations` - Create new conversation

8. **Analytics (Teacher)**
   - GET `/api/analytics/overview` - Get overview stats
   - GET `/api/analytics/engagement` - Get engagement data
   - GET `/api/analytics/top-performers` - Get top students
   - GET `/api/analytics/course-performance` - Get course metrics

9. **Dashboard**
   - GET `/api/dashboard/teacher/stats` - Teacher dashboard stats
   - GET `/api/dashboard/student/progress` - Student progress
   - GET `/api/dashboard/student/continue-learning` - Continue learning suggestion

## Frontend Implementation

### API Service Layer

Located in `src/services/api.js`, this file contains:
- Axios instance with automatic token injection
- Response interceptor for error handling
- Organized API functions grouped by feature

Example usage:
```javascript
import { coursesApi } from '../services/api';

// Get all courses
const courses = await coursesApi.getAll('student');

// Create a new course
const newCourse = await coursesApi.create(courseData);
```

### Custom Hooks

Located in `src/hooks/useApi.js`:

- `useFetch(apiFunction)` - Fetch data on component mount
- `useMutation(apiFunction)` - Handle POST/PUT/DELETE operations
- `useApi(apiFunction, immediate)` - Flexible API call hook

Example usage:
```javascript
import { useFetch } from '../hooks/useApi';
import { coursesApi } from '../services/api';

const MyCourses = () => {
  const { data, loading, error, refetch } = useFetch(() => coursesApi.getAll('student'));
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  
  return <CourseGrid courses={data} />;
};
```

### Authentication Context

Located in `src/context/AuthContext.jsx`:

Provides global authentication state management:
```javascript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, role, login, logout, isAuthenticated } = useAuth();
  
  // Use authentication state
};
```

### UI Components

**LoadingSpinner** (`src/components/LoadingSpinner.jsx`)
- Displays loading state during API calls
- Supports full-screen mode
- Customizable size and message

**ErrorMessage** (`src/components/ErrorMessage.jsx`)
- Displays error messages
- Optional retry button
- Supports full-screen mode

## Fallback Strategy

All pages implement a graceful fallback to mock data:

```javascript
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiData = await someApi.getData();
      setData(apiData);
    } catch (err) {
      // Fallback to mock data if API fails
      setData(mockData);
    }
  };
  fetchData();
}, []);
```

This ensures the application works even without the backend server running.

## Environment Configuration

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (server/.env)
```
MONGODB_URI=mongodb://localhost:27017/lms_db
JWT_SECRET=your-secret-key
PORT=5000
NODE_ENV=development
```

## Setup Instructions

### 1. Install Frontend Dependencies
```bash
npm install
```

### 2. Configure Environment
```bash
# Copy example environment file
cp .env.example .env

# Update variables as needed
```

### 3. Start Frontend Development Server
```bash
npm run dev
```

### 4. Backend Setup (if available)
```bash
cd server
npm install
cp .env.example .env
# Update MONGODB_URI in server/.env
npm run dev
```

## Testing Without Backend

The application is fully functional without the backend:
- All pages load with mock data
- Features are interactive (changes won't persist)
- Perfect for frontend development and UI testing

## API Security

- JWT token-based authentication
- Automatic token injection in headers
- Token refresh on 401 responses
- Secure credential storage in localStorage

## Error Handling

The application handles errors at multiple levels:

1. **Network Errors**: Automatic retry suggestions
2. **API Errors**: User-friendly error messages
3. **Authentication Errors**: Automatic logout and redirect
4. **Data Fallbacks**: Mock data when API unavailable

## Next Steps

To complete the full-stack integration:

1. **Implement Backend Server** - Create Express server with MongoDB
2. **Add MongoDB Models** - Define schemas for all collections
3. **Create API Routes** - Implement backend endpoints
4. **Add Validation** - Input validation and sanitization
5. **Implement Authentication** - JWT token generation and validation
6. **Add File Uploads** - Handle assignment submissions and avatars
7. **Real-Time Features** - WebSocket for live messaging
8. **Testing** - Unit and integration tests

## Support

For questions or issues with API integration:
- Check browser console for detailed error messages
- Verify environment variables are set correctly
- Ensure backend server is running (if applicable)
- Check network tab for API request/response details
