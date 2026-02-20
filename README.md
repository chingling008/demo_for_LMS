# LMS Portal - Learning Management System Template

A modern, responsive Learning Management System (LMS) template built with React, Vite, Tailwind CSS, and MongoDB. Features dual role support (Student/Teacher) with a beautiful UI, comprehensive functionality including assignments, calendar, messaging, analytics, and grades, plus full backend API integration.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run at `http://localhost:5173/` with mock data. For full backend integration, see [API Integration Guide](./API_INTEGRATION.md).

## 🌐 Deploy for Free

Deploy your LMS to the web in minutes for investor demos:

```bash
# Option 1: Deploy to Vercel (Recommended)
npm install -g vercel
vercel login
vercel --prod
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including Vercel, Netlify, and other free hosting options.

## 🔧 Tech Stack

- **Frontend**: React 19.2, Vite 7.3, Tailwind CSS 4.1
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Backend Ready**: MongoDB integration with REST API
- **State Management**: React Context API
- **Code Quality**: ESLint

## Features

### 🎨 Design
- **Slate-50** background for clean, professional look
- **Rounded-xl** cards throughout for modern aesthetics
- **Indigo-600** accent colors for consistency
- Fully responsive layout

### 🏗️ Layout
- **280px Fixed Sidebar**: Role-based navigation with 7 menu items
- **Sticky Topbar**: Search bar, role switcher, notifications, and profile
- Clean, organized content area

### 👨‍🏫 Teacher Role
- **Dashboard**: 4-column statistics cards showing:
  - Total Students
  - Active Courses
  - Course Completion Rate
  - Total Revenue
- **Course Management Table**: List of all courses with:
  - Student count
  - Completion percentage
  - Revenue tracking
  - Edit and Analytics buttons
- **Assignments Management**: Review and grade student submissions with status tracking
- **Analytics Dashboard**: Comprehensive performance tracking with:
  - Engagement rates and trends
  - Student performance metrics
  - Course-level analytics
  - Top performers leaderboard
  - Course comparison table
- **Calendar**: Schedule view with event management and upcoming deadlines
- **Messages**: Real-time messaging interface with students
- **"+ New Course" CTA**: Quick access to create new courses

### 👨‍🎓 Student Role
- **Dashboard**: 
  - **"Continue Learning" Hero Card**: Resume last accessed course with:
    - Course progress visualization
    - Time remaining
    - Current lesson info
  - **Course Grid**: 3-column grid of enrolled courses with:
    - Course thumbnails
    - Progress bars
    - Instructor information
    - Lesson tracking
- **Assignments**: Track all assignments with:
  - Status overview (Pending, Submitted, Overdue)
  - Due dates and submission status
  - Grade viewing
  - Quick submission actions
- **Grades**: Comprehensive grade tracking with:
  - Overall GPA and statistics
  - Course-by-course breakdown
  - Assignment scores and weights
  - Grade distribution visualization
  - Letter grade display
- **Calendar**: Personal schedule with:
  - Monthly calendar view
  - Assignment deadlines
  - Quiz and exam dates
  - Class sessions
  - Upcoming events list
- **Messages**: Direct communication with instructors
- **Profile Edit Page**: Tabbed interface with:
  - **Bio Tab**: Edit name, email, and bio
  - **Avatar Tab**: Choose emoji or upload image
  - **Security Tab**: Password management with requirements

### 🔄 Role Switcher
Toggle seamlessly between Student and Teacher views using the switcher in the topbar. Navigation menu updates dynamically based on the selected role.

## 📡 Backend Integration

This application includes full MongoDB backend integration:

- **REST API** with Express.js
- **MongoDB** for data persistence  
- **JWT Authentication** for secure access
- **Axios** for HTTP requests
- **Graceful Fallbacks** to mock data when backend is unavailable

See [API_INTEGRATION.md](./API_INTEGRATION.md) for complete API documentation and setup instructions.

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `VITE_API_URL` in `.env` to point to your backend API (default: `http://localhost:5000/api`).

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

**Note**: The application works standalone with mock data. To enable full backend features, ensure your MongoDB backend server is running.

### Build

Create a production-optimized build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## API Integration

The frontend is fully integrated with backend API endpoints:

- **Authentication**: Login, register, JWT tokens
- **Data Persistence**: All actions saved to MongoDB
- **Real-time Updates**: Automatic data refresh
- **Error Handling**: Graceful fallbacks to mock data
- **Loading States**: Spinner components during API calls

All pages automatically fetch data from the API when available, with seamless fallback to mock data if the backend is not running. This allows frontend development without requiring the backend to be operational.

For detailed API documentation, endpoint specifications, and backend setup instructions, see [API_INTEGRATION.md](./API_INTEGRATION.md).

## Project Structure

```
src/
├── components/              # Reusable UI components
│   ├── Sidebar.jsx         # Navigation sidebar (role-aware)
│   ├── Topbar.jsx          # Top navigation bar with role switcher
│   ├── TeacherStats.jsx    # Teacher statistics cards
│   ├── CourseTable.jsx     # Teacher course management table
│   ├── ContinueLearning.jsx # Student hero card
│   ├── CourseGrid.jsx      # Student course grid
│   └── ProfileEdit.jsx     # Settings profile editor
├── pages/                   # Page components
│   ├── TeacherDashboard.jsx # Teacher home page
│   ├── StudentDashboard.jsx # Student home page
│   ├── Courses.jsx         # Courses page (role-aware)
│   ├── Assignments.jsx     # Assignment management (role-aware)
│   ├── Grades.jsx          # Student grades and GPA tracking
│   ├── Analytics.jsx       # Teacher analytics dashboard
│   ├── Calendar.jsx        # Schedule and events (role-aware)
│   ├── Messages.jsx        # Messaging interface (role-aware)
│   └── Settings.jsx        # Settings page
├── data/                    # Mock data
│   └── mockData.js         # Sample courses, stats, users, assignments, etc.
├── App.jsx                  # Main app component with routing
├── main.jsx                 # App entry point
└── index.css                # Global styles with Tailwind
```

## Key Features by Page

### 📊 Dashboard
- **Teacher**: Statistics overview, course performance, quick actions
- **Student**: Continue learning card, enrolled courses grid

### 📚 Courses
- **Teacher**: Create and manage courses, track enrollments
- **Student**: Browse enrolled courses, view progress

### 📝 Assignments
- **Teacher**: Review submissions, grade assignments, track deadlines
- **Student**: View pending/submitted assignments, upload work, check grades

### 📈 Analytics (Teacher Only)
- Engagement metrics across all courses
- Top performers leaderboard
- Course performance comparison
- Student activity trends

### 🎓 Grades (Student Only)
- Overall GPA calculation
- Detailed grade breakdown by course
- Assignment scores and weights
- Grade distribution charts

### 📅 Calendar
- Monthly calendar view
- Color-coded events (assignments, classes, quizzes, exams)
- Upcoming events sidebar
- **Teacher**: Add new events
- **Student**: View schedules and deadlines

### 💬 Messages
- Real-time chat interface
- Conversation list with unread indicators
- Search functionality
- Student-instructor communication
```

## Customization

### Mock Data
Edit `src/data/mockData.js` to customize:
- Teacher statistics and course data
- Student courses and progress
- Assignment submissions and grades
- Calendar events and schedules
- Message conversations
- Analytics and performance metrics
- User profiles

### Styling
The app uses Tailwind CSS. Customize colors and styles in:
- Component files (inline Tailwind classes)
- `src/index.css` (global styles)

### Icons
Icons from Lucide React are used throughout. Browse available icons at [lucide.dev](https://lucide.dev/)

## Feature Highlights

✅ **7 Complete Pages** for each role  
✅ **Assignment Management** with submission tracking  
✅ **Grade Tracking** with GPA calculation  
✅ **Analytics Dashboard** with engagement metrics  
✅ **Interactive Calendar** with event types  
✅ **Messaging System** with real-time UI  
✅ **Role-Based Navigation** that adapts to user type  
✅ **Comprehensive Mock Data** for realistic demo experience

## 🚀 Deployment

Deploy your LMS to production for free:

### Vercel (Recommended - 2 minutes)
```bash
npm install -g vercel
vercel login
vercel --prod
```

### Quick Deployment Steps
1. Push code to GitHub
2. Import to Vercel: [vercel.com/new](https://vercel.com/new)
3. Click Deploy
4. Get instant live URL: `https://your-lms.vercel.app`

**Other Options**: Netlify, Render, GitHub Pages - see [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📖 Documentation

- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide with all hosting options
- **[API_INTEGRATION.md](./API_INTEGRATION.md)** - Backend API documentation and setup

## License

This is a demo template for LMS systems. Feel free to use and modify for your projects.
