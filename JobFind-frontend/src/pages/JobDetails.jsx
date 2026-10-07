import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function JobDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [applied, setApplied] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadJob();
    }, [id]);

    async function loadJob() {

        try {

            setLoading(true);
            setMessage("");
            setError("");

            const response = await api.get(`/jobs/${id}`);

            setJob(response.data);

        } catch (error) {

            setError(
                error.response?.data?.error ||
                "Unable to load job."
            );

        } finally {

            setLoading(false);

        }
    }

    async function applyForJob() {

        try {

            setApplying(true);
            setMessage("");
            setError("");

            await api.post("/applications", {
                jobId: Number(id)
            });

            setApplied(true);

            setMessage(
                "Application submitted successfully."
            );

        } catch (error) {

            const errorMessage =
                error.response?.data?.error ||
                "Unable to apply for this job.";

            if (
                errorMessage.toLowerCase().includes("already applied")
            ) {
                setApplied(true);
            }

            setError(errorMessage);

        } finally {

            setApplying(false);

        }
    }

    if (loading) {

        return (
            <div className="job-details-page">
                <div className="job-details-loading">
                    Loading job...
                </div>
            </div>
        );
    }

    if (!job) {

        return (
            <div className="job-details-page">

                <div className="job-details-error">

                    <h2>Job not found</h2>

                    {error && (
                        <p>{error}</p>
                    )}

                    <button
                        onClick={() => navigate("/jobs")}
                    >
                        Back to Jobs
                    </button>

                </div>

            </div>
        );
    }

    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    return (
        <div className="job-details-page">

            <button
                className="back-jobs-button"
                onClick={() => navigate("/jobs")}
            >
                ← Back to Jobs
            </button>

            <div className="job-details-header">

                <span>JOB OPPORTUNITY</span>

                <h1>{job.title}</h1>

                <p>
                    Explore the role, requirements and
                    application details below.
                </p>

            </div>

            <div className="job-details-layout">

                <div className="job-details-main">

                    <div className="job-details-card">

                        <div className="job-info-grid">

                            <div className="job-info-item">

                                <span>Location</span>

                                <strong>
                                    {job.location || "Not specified"}
                                </strong>

                            </div>

                            <div className="job-info-item">

                                <span>Job Type</span>

                                <strong>
                                    {job.jobType || "Not specified"}
                                </strong>

                            </div>

                            <div className="job-info-item">

                                <span>Salary</span>

                                <strong>
                                    {job.salary
                                        ? `₹${Number(job.salary).toLocaleString("en-IN")}`
                                        : "Not specified"}
                                </strong>

                            </div>

                        </div>

                    </div>

                    <div className="job-details-card">

                        <div className="job-section">

                            <h2>About the Role</h2>

                            <p className="job-description">
                                {job.description}
                            </p>

                        </div>

                        <div className="job-section">

                            <h2>Required Skills</h2>

                            <div className="skills-list">

                                {job.skills
                                    ?.split(",")
                                    .map((skill, index) => (
                                        <span
                                            className="skill-tag"
                                            key={index}
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}

                            </div>

                        </div>

                    </div>

                </div>

                <aside className="job-apply-card">

                    <h2>Interested in this role?</h2>

                    <p>
                        Submit your application and
                        track its status from your dashboard.
                    </p>

                    {message && (
                        <div className="job-success-message">
                            {message}
                        </div>
                    )}

                    {error && (
                        <div className="job-error-message">
                            {error}
                        </div>
                    )}

                    {token && role === "CANDIDATE" && !applied && (

                        <button
                            className="job-apply-button"
                            onClick={applyForJob}
                            disabled={applying}
                        >
                            {applying
                                ? "Submitting..."
                                : "Apply Now"}
                        </button>

                    )}

                    {token && role === "CANDIDATE" && applied && (

                        <button
                            className="job-applied-button"
                            disabled
                        >
                            ✓ Application Submitted
                        </button>

                    )}

                    {!token && (

                        <button
                            className="job-apply-button"
                            onClick={() => navigate("/login")}
                        >
                            Login to Apply
                        </button>

                    )}

                    {token && role === "RECRUITER" && (

                        <div className="job-recruiter-message">
                            Recruiters cannot apply for jobs.
                        </div>

                    )}

                </aside>

            </div>

        </div>
    );
}

export default JobDetails;