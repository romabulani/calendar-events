## Calendar Events Application
This [project](https://calendarevents.vercel.app/) is a full-stack calendar management application built using React, TypeScript, Material UI, and Tailwind CSS for the frontend, and Node.js, Express.js, and MongoDB for the backend. It allows users to view, create, and manage weekly events with features like authentication, user search, and seeing other's events.

### Features
#### Authentication
- Signup: New users can signup using user email and password.
- Login: Users can log in with email and password. Authentication tokens are valid for 72 hours.
- Logout: Seamless logout functionality, clearing user session.
  
### Landing Page
- Landing Page with cool UI to attract users for signup and login.
  
#### Calendar UI
- Weekly View: Displays the current week in an hourly grid format. Navigate between previous and next weeks using buttons. All events are displayed on the calendar with clear visibility.
- Clarity: The events are color coded based on tags (work, home, google-event) and other user's events. On the click of the events, the dialog opens with event details.
- Event Creation: Users can create events by clicking a button, which opens a form dialog. Fields include name, date, time, duration, and tag. Checks for overlapping events and prevents time conflicts.
- User Search & Sharing
    - Search Users: Find other registered users by name or email.
    - Shared View: View another user's events seamlessly on your calendar.
- Notifications: Added success/error notifications for key user actions like login, event creation, or invalid operations.
- Error Handling & Logging
    - Comprehensive error messages for failed requests, validation errors, and authentication issues.
    - Backend includes logging for better debugging.
  
#### Google Calendar Integration
 - Sync events with Google Calendar.
 - Reset Sync to stop syncing google calendar events.

#### Code Quality
- TypeScript: Strongly typed codebase for improved maintainability and fewer bugs.
- SOLID Principles: Clean, scalable, and extensible architecture.
- Reusable Components: Built modular components for dialogs, forms, and UI elements.
- Application Links:
    - [Frontend](https://calendarevents.vercel.app/)
    - [Backend](https://calendarevents-backend.vercel.app/api-docs/)

### Technologies Used
#### Frontend
- React: Framework for building user interfaces.
- React Router v6: For routing.
- TypeScript: Adds type safety and enhances development experience.
- Material UI: Component library for responsive design.
- Tailwind CSS: Utility-first CSS framework for styling.
- Toastify: Notifications for user actions.

### Highlights
- Reusable Code: All components and services are designed to be reused throughout the app.
- Toastify Integration: Provides instant feedback to users on their actions.
- Prev/Next Week Navigation: Easily switch between weeks to view past or upcoming events.
  
### Setup Instructions
```
git clone https://github.com/romabulani/calendar-events
cd calendar-events
npm install
npm start
```

### Future Enhancements
- Responsiveness can be added for smaller devices.
- Recurring Events: Add support for recurring events.
- Advanced Filters: Filter events by tags, date range, or user.


### Notes
Ensure to add users in the Google Cloud Console project for Google Calendar API access. Without this, Google integration will not work.

### License
This project is open-source and available under the MIT License.
