\# JobFind – Full-Stack Job Portal



JobFind is a full-stack job portal application designed to connect candidates and recruiters through a secure and user-friendly platform.



The application supports both \*\*IT and non-IT job opportunities\*\* and provides separate functionality for candidates and recruiters.



\## 🚀 Features



\### 👤 Candidate



\* Candidate registration and login

\* JWT-based authentication

\* Browse available jobs

\* Search jobs by keyword

\* Filter jobs by location, job type, skills and area of interest

\* View detailed job information

\* Apply for jobs

\* Prevent duplicate applications

\* Track application status

\* Manage candidate profile

\* View/download resume



\### 🏢 Recruiter



\* Recruiter registration and login

\* JWT-based authentication and authorization

\* Create and manage job postings

\* Edit and delete jobs

\* View applicants

\* Manage candidate applications

\* Shortlist candidates

\* Reject candidates

\* Hire candidates

\* Track application statuses



\## 🛠️ Tech Stack



\### Backend



\* Java 21

\* Spring Boot

\* Spring Security

\* JWT

\* Spring Data JPA

\* Hibernate

\* MySQL

\* Maven

\* REST APIs



\### Frontend



\* React.js

\* Vite

\* JavaScript

\* CSS

\* React Router



\### Tools



\* Git

\* GitHub

\* VS Code

\* MySQL / XAMPP

\* Postman



\## 📂 Project Structure



```text

JobFind-Full-Stack-Job-Portal/

│

├── JobFind-backend/

│   ├── src/

│   ├── pom.xml

│   └── README.md

│

└── JobFind-frontend/

&#x20;   ├── src/

&#x20;   ├── public/

&#x20;   ├── package.json

&#x20;   └── README.md

```



\## 🔐 Authentication



JobFind uses \*\*Spring Security and JWT\*\* for authentication and role-based authorization.



The application supports separate access for:



\* Candidate

\* Recruiter



Protected APIs require a valid JWT token.



\## 🔎 Job Search



Candidates can search and filter jobs using criteria such as:



\* Keyword

\* Location

\* Job type

\* Skills

\* Area of interest



Pagination is also implemented for job listings.



\## 📋 Application Workflow



```text

Candidate

&#x20;   ↓

Search Jobs

&#x20;   ↓

View Job Details

&#x20;   ↓

Apply

&#x20;   ↓

Application Status

&#x20;   ↓

Recruiter Reviews Application

&#x20;   ↓

Shortlist / Reject / Hire

```



\## ⚙️ Running the Project



\### Backend



Navigate to the backend folder:



```bash

cd JobFind-backend

```



Run:



```bash

mvn spring-boot:run

```



The backend runs on:



```text

http://localhost:8081

```



\### Frontend



Open another terminal and navigate to:



```bash

cd JobFind-frontend

```



Install dependencies:



```bash

npm install

```



Start the development server:



```bash

npm run dev

```



The frontend runs on:



```text

http://localhost:5173

```



\## 🗄️ Database



The backend uses \*\*MySQL\*\*.



Create a database named:



```sql

CREATE DATABASE job\_portal;

```



Configure the database connection in:



```text

JobFind-backend/src/main/resources/application.properties

```



Do not commit database credentials or secret keys to GitHub.



\## 📡 Backend API



The application provides REST APIs for:



\* Authentication

\* Candidate management

\* Recruiter management

\* Job management

\* Job search and filtering

\* Job applications

\* Application status management

\* Resume handling



\## 🎯 Project Highlights



\* Full-stack application using Java and React

\* RESTful API architecture

\* JWT authentication

\* Role-based authorization

\* Candidate and recruiter dashboards

\* Job search and filtering

\* Pagination

\* End-to-end application workflow

\* Resume management

\* MySQL database integration

\* Secure backend API design



\## 👩‍💻 Author



\*\*Hrithika B.\*\*



MCA Graduate | Java | Spring Boot | React.js | MySQL



\---



⭐ If you find this project useful, consider giving the repository a star.



