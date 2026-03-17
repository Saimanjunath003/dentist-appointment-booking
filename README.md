# Dentist Appointment Booking Platform

Built with React + Vite (frontend) and Node.js + SQLite/Sequelize (backend).

## 🦷 Project Overview

This platform allows patients to:
- View a list of dentists with their qualifications and clinic details
- Book appointments with their chosen dentist
- Admins can view and manage all appointments

## 🛠 Tech Stack

### Frontend
- **React** - User interface library
- **React Router** - Navigation
- **Axios** - HTTP client for API requests
- **CSS** - Custom styling

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **SQLite** - Database (with Sequelize ORM)

## 📁 Project Structure

```
dentist-appointment/
├── backend/
│   ├── models/
│   │   ├── Dentist.js       # Dentist data model
│   │   └── Appointment.js   # Appointment data model
│   ├── routes/
│   │   ├── dentistRoutes.js    # Dentist API endpoints
│   │   └── appointmentRoutes.js # Appointment API endpoints
│   ├── server.js           # Express server setup
│   └── package.json        # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── DentistList.js      # Dentist listing page
│   │   │   ├── BookAppointment.js  # Booking form
│   │   │   └── AdminPanel.js       # Admin dashboard
│   │   ├── App.js         # Main app component
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
│
└── README.md              # This file
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud instance)

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```

4. Start the backend server:
   ```bash
   npm start
   ```
   
   Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   App runs on http://localhost:3000 (Vite)

## 🔌 API Endpoints

### Dentists
- `GET /api/dentists` - Get all dentists
- `GET /api/dentists/:id` - Get single dentist

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create new appointment
- `DELETE /api/appointments/:id` - Delete appointment

## 📱 Features

### Patient Features
1. **Browse Dentists** - View all available dentists with their details
2. **View Profiles** - See qualifications, experience, clinic info
3. **Book Appointment** - Select date and provide patient details
4. **Confirmation** - Receive booking confirmation

### Admin Features
1. **View All Appointments** - See all scheduled appointments
2. **Manage Appointments** - Delete appointments as needed
3. **Appointment Details** - View patient info, dentist, and clinic

## 🎨 Design

- Clean, modern UI with gradient header
- Responsive design for mobile and desktop
- Card-based dentist listing
- Form validation for booking
- Success/error feedback

## 📝 License

This project is for educational purposes.

## 👤 Author

Created as part of the OroGlee Assignment.
