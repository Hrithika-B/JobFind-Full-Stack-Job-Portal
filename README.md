# JobFind – Full-Stack Job Portal

JobFind is a full-stack job portal application developed using **Java 21, Spring Boot, Spring Security, JWT, Spring Data JPA, Hibernate, MySQL, and React.js**.

The application connects **job seekers and recruiters** and supports job opportunities across **IT and non-IT domains**.

## 🚀 Features

### 👤 Candidate

* Candidate registration and login
* JWT-based authentication
* Browse available jobs
* Search and filter jobs
* View detailed job information
* Apply for jobs
* Prevent duplicate applications
* Track application status
* Manage candidate profile
* View and download resume

### 🏢 Recruiter

* Recruiter registration and login
* JWT-based authentication and authorization
* Create, update, and delete job postings
* View job applicants
* Manage applications
* Shortlist candidates
* Reject candidates
* Hire candidates
* Track application status

## 🛠️ Tech Stack

### Backend

* **Java 21**
* **Spring Boot**
* **Spring Security**
* **JWT**
* **Spring Data JPA**
* **Hibernate**
* **MySQL**
* **Maven**
* **REST APIs**

### Frontend

* **React.js**
* **Vite**
* **JavaScript**
* **CSS**
* **React Router**

### Tools

* **Git & GitHub**
* **VS Code**
* **Postman**
* **MySQL / XAMPP**

## 🏗️ Backend Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
MySQL
```

### Layers

* **Controller** – Handles HTTP requests and REST API endpoints
* **Service** – Contains application business logic
* **Repository** – Handles database operations using Spring Data JPA
* **Entity** – Represents database tables
* **Security** – Handles authentication and authorization using Spring Security and JWT

## 🔐 Authentication & Authorization

JobFind uses **Spring Security and JWT** to provide secure authentication and role-based authorization.

The application supports two main roles:

* **Candidate**
* **Recruiter**

Protected APIs require a valid JWT token.

## 🔎 Job Search

Candidates can search and filter jobs based on:

* Keyword
* Location
* Job type
* Skills
* Area of interest
* Education

Job listings support **pagination** to efficiently display available jobs.

## 📋 Application Workflow

```text
Candidate
    ↓
Search Jobs
    ↓
View Job Details
    ↓
Apply for Job
    ↓
Recruiter Reviews Application
    ↓
Shortlist / Reject / Hire
```

### Application Statuses

* **APPLIED**
* **SHORTLISTED**
* **REJECTED**
* **HIRED**

## 📂 Project Structure

```text
JobFind-Full-Stack-Job-Portal/
│
├── JobFind-backend/
│   ├── src/
│   └── pom.xml
│
├── JobFind-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## 🗄️ Database

JobFind uses **MySQL** with **Spring Data JPA and Hibernate** for database management.

Create the database using:

```sql
CREATE DATABASE job_portal;
```

The local database configuration is maintained in:

```text
JobFind-backend/src/main/resources/application.properties
```

> **Note:** Database credentials and secret keys should not be committed to GitHub.

## 📡 REST API Modules

The backend provides REST APIs for:

* Authentication
* Candidate management
* Recruiter management
* Job management
* Job search and filtering
* Job applications
* Application status management
* Resume handling

## ⚙️ How to Run the Project

### 1. Start the Backend

Open a terminal and run:

```bash
cd JobFind-backend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8081
```

### 2. Start the Frontend

Open another terminal and run:

```bash
cd JobFind-frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## 🎯 Project Highlights

* Developed a **Java 21 Spring Boot backend**
* Built REST APIs using **Spring Boot**
* Implemented **Spring Security and JWT authentication**
* Implemented **role-based authorization**
* Used **Spring Data JPA and Hibernate** for database operations
* Integrated **MySQL** for data persistence
* Implemented job search, filtering, and pagination
* Developed candidate and recruiter workflows
* Implemented complete job application management
* Built the frontend using **React.js and Vite**
* Used **Git and GitHub** for version control

## 👩‍💻 Author

**Hrithika B.**

MCA Graduate | Java | Spring Boot | React.js | MySQL

---

⭐ **JobFind – A full-stack Java Spring Boot project demonstrating backend, database, security, and frontend development skills.**
