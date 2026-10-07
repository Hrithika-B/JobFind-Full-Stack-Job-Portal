import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

import CandidateDashboard from "./pages/CandidateDashboard";
import CandidateProfile from "./pages/CandidateProfile";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import Applicants from "./pages/Applicants";

import RecruiterProfile from "./pages/RecruiterProfile";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/jobs" element={<Jobs />} />

                <Route
                    path="/jobs/:id"
                    element={<JobDetails />}
                />

                <Route
                    path="/candidate/dashboard"
                    element={
                        <ProtectedRoute role="CANDIDATE">
                            <CandidateDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/candidate/profile"
                    element={
                        <ProtectedRoute role="CANDIDATE">
                            <CandidateProfile />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/dashboard"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <RecruiterDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/create-job"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <CreateJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/edit-job/:id"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <EditJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/recruiter/applicants/:jobId"
                    element={
                        <ProtectedRoute role="RECRUITER">
                            <Applicants />
                        </ProtectedRoute>
                    }
                />
                <Route
    path="/recruiter/profile"
    element={
        <ProtectedRoute role="RECRUITER">
            <RecruiterProfile />
        </ProtectedRoute>
    }
/>

            </Routes>

        </BrowserRouter>
    );
}

export default App;