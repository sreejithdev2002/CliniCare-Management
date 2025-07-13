# CliniCare - Clinic Management System

**CliniCare** is a modern and responsive **Clinic Management System** built for clinic staff to efficiently **generate, track, and manage appointments**. Designed with simplicity and usability in mind, CliniCare includes features such as calendar-based appointment booking, patient-doctor association, appointment tracking, and dark mode support.

---

## 🔐 Staff Login

To access the system, staff can log in using the following credentials:

- **Email:** `staff@clinic.com`
- **Password:** `123456`

Upon successful login, the user is redirected to the dashboard.

---

## 📋 Features

- **Login Page** – Authenticates staff using email and password.
- **Dashboard (`/dashboard`)**:
  - Displays a **single-month calendar** view.
  - Displays a **single-day calender** view for Mobile Devices.
  - Allows the staff to **select a date** and **add appointments**.
  - Appointment includes:
    - Patient Name
    - Doctor Name
    - Time Slot
    - Reason
    - Status: `Scheduled`, `Completed`, or `Cancelled`
  - Shows a **table of appointments for the selected day** below the calendar.
  - Each appointment row includes **Edit** and **Delete** options.
- **Appointments Page (`/appointments`)**:
  - Displays a **full table of all appointments** in the system.
  - Can filter data using Doctors and Appointment Status.
- **Dark Mode Support** – Switch between light and dark themes for better accessibility.

---

## 🛠 Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS, Material UI
- **State Management:** React useState/useEffect and localStorage (for data persistence)

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sreejithdev2002/CliniCare-Management.git
cd CliniCare-Management

# Install dependencies
npm install

# Start the development server
npm run dev

