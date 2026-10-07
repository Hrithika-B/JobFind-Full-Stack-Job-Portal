# JobFind – Full-Stack Job Portal

JobFind is a full-stack job portal application that connects candidates and recruiters through a secure, role-based platform. Candidates can discover and apply for jobs, while recruiters can create job postings, manage applicants, and update application statuses.

## Features

### Candidate

* Register and login securely
* Create and update candidate profile
* Search and browse jobs
* Filter jobs by location, area of interest, job type, and skills
* View detailed job information
* Apply for jobs
* Prevent duplicate applications
* Upload, view, and download resumes
* Track application status
* View application history
* View shortlisted and hired applications

### Recruiter

* Register and login securely
* Create and update recruiter profile
* Create, edit, and delete job postings
* View jobs posted by the recruiter
* Manage applicants
* View candidate details and resumes
* Download applicant resumes
* Shortlist candidates
* Hire or reject candidates
* Track applicant counts and job activity

## Security

* JWT-based authentication
* Spring Security integration
* Role-based authorization
* Candidate and recruiter access control
* Protected API requests
* Automatic logout when authentication expires

## Job Search and Filtering

JobFind supports job discovery through:

* Keyword search
* Location filtering
* Area of interest filtering
* Job type filtering
* Skills filtering
* Pagination

The portal supports both **IT and non-IT opportunities**, including software development, data roles, HR, finance, sales, marketing, operations, customer support, and other career areas.

## Tech Stack

### Frontend

* React.js
* JavaScript
* Vite
* React Router
* Axios
* HTML5
* CSS3

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* REST APIs
* Maven

### Database

* MySQL

## Frontend Project Structure

```text
src/
├── components/
│   ├── JobCard.jsx
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Applicants.jsx
│   ├── CandidateDashboard.jsx
│   ├── CandidateProfile.jsx
│   ├── CreateJob.jsx
│   ├── EditJob.jsx
│   ├── Home.jsx
│   ├── JobDetails.jsx
│   ├── Jobs.jsx
│   ├── Login.jsx
│   ├── RecruiterDashboard.jsx
│   ├── RecruiterProfile.jsx
│   └── Register.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── App.css
└── index.css
```

## Backend Integration

The React frontend communicates with the Spring Boot REST API.

Backend API:

```text
http://localhost:8081/api
```

The backend provides APIs for:

* Authentication
* Candidate profiles
* Recruiter profiles
* Job management
* Job search and filtering
* Applications
* Applicant management
* Resume handling

## Installation and Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start the frontend

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

### 3. Start the backend

Run the Spring Boot backend separately.

The backend runs on:

```text
http://localhost:8081
```

Make sure MySQL is running before starting the backend.

## Production Build

To create a production build:

```bash
npm run build
```

The production files are generated inside the:

```text
dist/
```

directory.

## Application Flow

### Candidate

```text
Register
   ↓
Login
   ↓
Complete Profile
   ↓
Browse Jobs
   ↓
Search / Filter Jobs
   ↓
View Job Details
   ↓
Apply
   ↓
Track Application
   ↓
Shortlisted / Hired / Rejected
```

### Recruiter

```text
Register
   ↓
Login
   ↓
Complete Profile
   ↓
Create Job
   ↓
Manage Jobs
   ↓
View Applicants
   ↓
View Candidate Resume
   ↓
Shortlist / Hire / Reject
```

## Authentication Flow

```text
User Login
    ↓
Spring Boot Authentication API
    ↓
JWT Token
    ↓
Frontend Stores Token
    ↓
Axios Sends JWT
    ↓
Spring Security Validates Token
    ↓
Role-Based Access
```

## Future Enhancements

* Email notifications
* Advanced recruiter analytics
* Candidate recommendations
* Saved jobs
* Job alerts
* Cloud-based resume storage
* Production deployment

## Author

**Hrithika B.**

MCA Graduate | Java | Spring Boot | React.js | MySQL
