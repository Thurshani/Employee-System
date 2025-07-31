 
🕒 Employee Attendance Management System

A full-stack web application that allows employees to mark their attendance (check-in and check-out) and provides an admin panel for viewing logs, managing sessions, and generating reports.

## 📌 Features

### 👨‍💼 Admin
- Login securely
- View all employee attendance logs
- See total number of employees
- Generate PDF reports of attendance
- Logout functionality

### 👷‍♂️ Employee
- Login securely
- Check-in and check-out
- View personal attendance logs
- Logout functionality

### 🧑‍💻 Tech Stack
Frontend: React, Axios, Tailwind CSS, jsPDF
Backend: Node.js, Express.js, MongoDB (Mongoose)
Database: Local MongoDB
Authentication: JWT tokens (stored in localStorage)

Steps
1.Clone the frontend repo (or your combined repo):

    git clone <frontend-repo-url>
    cd frontend
    

2.Install dependencies:

    npm install
    

3.Configure API base URL if needed
Edit your API call base URL inside your React components or create a config file to point to your backend API URL.


4.Run the dev server:

    npm run dev
    
    
5. Open your app:
By default, Vite serves on http://localhost:5173



Tailwind CSS Setup (already configured):

Tailwind is integrated with Vite.
The styles are imported in your index.css or main.css.
Use Tailwind utility classes in JSX for styling.




Backend Setup (Node.js + Express + MongoDB)
Steps

1.Clone the backend repo or your combined repo:

    git clone <backend-repo-url>
    cd backend
    

2.Install dependencies:

    npm install
    
    
3.Create .env file in backend root:

    PORT=5000
    MONGO_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/attendance?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret_here


4.Run backend server:

    npm run dev


How to Use:
Start your MongoDB instance or Atlas cluster.
Start backend server (npm run dev).
Start frontend dev server (npm run dev).
Open your browser at http://localhost:5173.
Login as admin or employee.
CheckIn ,CheckOut, Viewattendance logs, generate PDF reports, and logout.











