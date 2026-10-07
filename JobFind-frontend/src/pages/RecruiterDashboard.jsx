import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function RecruiterDashboard() {
    const [jobs, setJobs] = useState([]);
const [applicantCounts, setApplicantCounts] = useState({});
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs() {
    try {
        setLoading(true);
        setMessage("");

        const response = await api.get("/jobs/recruiter");

        const recruiterJobs = response.data;

        setJobs(recruiterJobs);

        const counts = {};

        await Promise.all(
            recruiterJobs.map(async (job) => {
                try {
                    const applicationsResponse = await api.get(
                        `/applications/job/${job.id}`
                    );

                    counts[job.id] = applicationsResponse.data.length;
                } catch (error) {
                    counts[job.id] = 0;
                }
            })
        );

        setApplicantCounts(counts);

    } catch (error) {
        setMessage(
            error.response?.data?.error ||
            "Unable to load your jobs."
        );
    } finally {
        setLoading(false);
    }
}

    async function deleteJob(id) {
        if (!window.confirm("Are you sure you want to delete this job?")) {
            return;
        }

        try {
            await api.delete(`/jobs/${id}`);
            await loadJobs();
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                "Unable to delete job."
            );
        }
    }

    const totalJobs = jobs.length;

    const activeJobs = jobs.filter(
        (job) => job.status !== "CLOSED"
    ).length;

    const closedJobs = jobs.filter(
        (job) => job.status === "CLOSED"
    ).length;

    const totalApplicants = Object.values(applicantCounts).reduce(
    (total, count) => total + count,
    0
);

    if (loading) {
        return (
            <div className="recruiter-dashboard">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="recruiter-dashboard">

            <div className="recruiter-dashboard-header">

                <div>
                    <span className="dashboard-label">
                        RECRUITER DASHBOARD
                    </span>

                    <h1>Manage your job postings</h1>

                    <p>
                        Create jobs, review applicants and manage your
                        recruitment process.
                    </p>
                </div>

                <Link
                    to="/recruiter/create-job"
                    className="create-job-button"
                >
                    + Post a Job
                </Link>

            </div>

            {message && (
                <div className="recruiter-message">
                    {message}
                </div>
            )}

            <div className="recruiter-stat-grid">

                <div className="recruiter-stat-card">
                    <span>Total Jobs</span>
                    <strong>{totalJobs}</strong>
                </div>

                <div className="recruiter-stat-card">
                    <span>Active Jobs</span>
                    <strong>{activeJobs}</strong>
                </div>

                <div className="recruiter-stat-card">
                    <span>Total Applicants</span>
                    <strong>{totalApplicants}</strong>
                </div>

                <div className="recruiter-stat-card">
                    <span>Closed Jobs</span>
                    <strong>{closedJobs}</strong>
                </div>

            </div>

            <div className="recruiter-jobs-section">

                <div className="recruiter-section-heading">
                    <div>
                        <h2>Your Job Postings</h2>
                        <p>
                            Manage the jobs posted by your account.
                        </p>
                    </div>
                </div>

                {jobs.length === 0 ? (

                    <div className="recruiter-empty-state">

                        <h3>No jobs posted yet</h3>

                        <p>
                            Create your first job posting to start receiving
                            applications.
                        </p>

                        <Link to="/recruiter/create-job">
                            Create Your First Job
                        </Link>

                    </div>

                ) : (

                    <div className="recruiter-job-list">

                        {jobs.map((job) => (

                            <div
                                className="recruiter-job-card"
                                key={job.id}
                            >

                                <div className="recruiter-job-main">

                                    <div className="recruiter-job-icon">
                                        J
                                    </div>

                                    <div>
                                        <h3>{job.title}</h3>

                                        <p>
                                            {job.location ||
                                                "Location not specified"}
                                        </p>

                                        {job.company && (
                                            <span>
                                                {job.company}
                                            </span>
                                        )}
                                    </div>

                                </div>

                                <div className="recruiter-job-info">

                                    <div>
                                        <span>Applicants</span>
                                        <strong>
                                            {applicantCounts[job.id] || 0}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Status</span>
                                        <strong
                                            className={
                                                job.status === "CLOSED"
                                                    ? "job-status-closed"
                                                    : "job-status-active"
                                            }
                                        >
                                            {job.status || "ACTIVE"}
                                        </strong>
                                    </div>

                                </div>

                                <div className="recruiter-job-actions">

                                    <Link
                                        to={`/recruiter/applicants/${job.id}`}
                                        className="applicants-button"
                                    >
                                        Applicants
                                    </Link>

                                    <Link
                                        to={`/recruiter/edit-job/${job.id}`}
                                        className="edit-job-button"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        className="delete-job-button"
                                        onClick={() =>
                                            deleteJob(job.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default RecruiterDashboard;