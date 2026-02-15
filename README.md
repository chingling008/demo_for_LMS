# LMS Portal - Learning Management System Template

A modern, responsive Learning Management System (LMS) template built with React, Vite, and Tailwind CSS. Features dual role support (Student/Teacher) with a beautiful UI and comprehensive functionality.

## Features

### 🎨 Design
- **Slate-50** background for clean, professional look
- **Rounded-xl** cards throughout for modern aesthetics
- **Indigo-600** accent colors for consistency
- Fully responsive layout

### 🏗️ Layout
- **280px Fixed Sidebar**: Home, Courses, and Settings navigation
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
- **"+ New Course" CTA**: Quick access to create new courses

### 👨‍🎓 Student Role
- **"Continue Learning" Hero Card**: Resume last accessed course with:
  - Course progress visualization
  - Time remaining
  - Current lesson info
- **Course Grid**: 3-column grid of enrolled courses with:
  - Course thumbnails
  - Progress bars
  - Instructor information
  - Lesson tracking
- **Profile Edit Page**: Tabbed interface with:
  - **Bio Tab**: Edit name, email, and bio
  - **Avatar Tab**: Choose emoji or upload image
  - **Security Tab**: Password management with requirements

### 🔄 Role Switcher
Toggle seamlessly between Student and Teacher views using the switcher in the topbar.

## Tech Stack

- **React 19.2** - UI library
- **Vite 7.3** - Build tool and dev server
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **ESLint** - Code quality

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

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

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Sidebar.jsx    # Navigation sidebar
│   ├── Topbar.jsx     # Top navigation bar with role switcher
│   ├── TeacherStats.jsx      # Teacher statistics cards
│   ├── CourseTable.jsx       # Teacher course management table
│   ├── ContinueLearning.jsx  # Student hero card
│   ├── CourseGrid.jsx        # Student course grid
│   └── ProfileEdit.jsx       # Settings profile editor
├── pages/             # Page components
│   ├── TeacherDashboard.jsx  # Teacher home page
│   ├── StudentDashboard.jsx  # Student home page
│   ├── Courses.jsx           # Courses page (role-aware)
│   └── Settings.jsx          # Settings page
├── data/              # Mock data
│   └── mockData.js    # Sample courses, stats, users
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles with Tailwind
```

## Customization

### Mock Data
Edit `src/data/mockData.js` to customize:
- Teacher statistics
- Course listings
- Student progress
- User profiles

### Styling
The app uses Tailwind CSS. Customize colors and styles in:
- Component files (inline Tailwind classes)
- `src/index.css` (global styles)

### Icons
Icons from Lucide React are used throughout. Browse available icons at [lucide.dev](https://lucide.dev/)

## License

This is a demo template for LMS systems. Feel free to use and modify for your projects.
