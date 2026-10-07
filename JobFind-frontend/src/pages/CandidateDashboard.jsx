import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function CandidateDashboard() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    async function loadApplications() {
        try {
            setLoading(true);
            setMessage("");

            const response = await api.get("/applications/my");
            setApplications(response.data);
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                "Unable to load applications."
            );
        } finally {
            setLoading(false);
        }
    }

    function getStatusClass(status) {
        return `candidate-status-${status?.toLowerCase()}`;
    }

    function getStatusText(status) {
        if (status === "APPLIED") {
            return "Application Submitted";
        }

        if (status === "SHORTLISTED") {
            return "Shortlisted";
        }

        if (status === "REJECTED") {
            return "Not Selected";
        }

        if (status === "HIRED") {
            return "Hired";
        }

        return status;
    }

    function formatDate(date) {
        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString();
    }

    const appliedCount = applications.length;

    const shortlistedCount = applications.filter(
        (application) => application.status === "SHORTLISTED"
    ).length;

    const hiredCount = applications.filter(
        (application) => application.status === "HIRED"
    ).length;

    const rejectedCount = applications.filter(
        (application) => application.status === "REJECTED"
    ).length;

    if (loading) {
        return (
            <div className="candidate-dashboard dashboard-page">
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
       <div className="candidate-dashboard dashboard-page">

            <div className="candidate-dashboard-header">
                <div>
                    <span className="dashboard-label">
                        CANDIDATE DASHBOARD
                    </span>

                    <h1>Track your job applications</h1>

                    <p>
                        View your applications and monitor their latest status.
                    </p>
                </div>

                <Link
                    to="/jobs"
                    className="browse-jobs-button"
                >
                    Browse Jobs
                </Link>
            </div>

            {message && (
                <div className="dashboard-message">
                    {message}
                </div>
            )}

            <div className="candidate-stat-grid">

                <div className="candidate-stat-card">
                    <span>Total Applications</span>
                    <strong>{appliedCount}</strong>
                </div>

                <div className="candidate-stat-card">
                    <span>Shortlisted</span>
                    <strong>{shortlistedCount}</strong>
                </div>

                <div className="candidate-stat-card">
                    <span>Hired</span>
                    <strong>{hiredCount}</strong>
                </div>

                <div className="candidate-stat-card">
                    <span>Rejected</span>
                    <strong>{rejectedCount}</strong>
                </div>

            </div>

            <div className="candidate-applications-section">

                <div className="section-heading">
                    <div>
                        <h2>My Applications</h2>
                        <p>
                            Keep track of the jobs you have applied for.
                        </p>
                    </div>
                </div>

                {applications.length === 0 ? (

                    <div className="candidate-empty-state">

                        <h3>No applications yet</h3>

                        <p>
                            Start exploring jobs and apply for positions
                            that match your skills.
                        </p>

                        <Link to="/jobs">
                            Find Jobs
                        </Link>

                    </div>

                ) : (

                    <div className="candidate-application-list">

                        {applications.map((application) => (

                            <div
                                className="candidate-application-card"
                                key={application.id}
                            >

                                <div className="candidate-job-info">

                                    <div className="candidate-job-icon">
                                        J
                                    </div>

                                    <div>
                                        <h3>
                                            {application.job?.title ||
                                                "Job"}
                                        </h3>

                                        <p>
                                            {application.job?.location ||
                                                "Location not available"}
                                        </p>

                                        {application.job?.company && (
                                            <span>
                                                {application.job.company}
                                            </span>
                                        )}
                                    </div>

                                </div>

                                <div className="candidate-application-details">

                                    <div>
                                        <span>Applied On</span>
                                        <strong>
                                            {formatDate(
                                                application.appliedAt
                                            )}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Status</span>

                                        <strong
                                            className={getStatusClass(
                                                application.status
                                            )}
                                        >
                                            {getStatusText(
                                                application.status
                                            )}
                                        </strong>
                                    </div>

                                </div>

                                {application.status === "APPLIED" && (
                                    <div className="application-progress">

                                        <div className="progress-step active">
                                            <span>1</span>
                                            <p>Applied</p>
                                        </div>

                                        <div className="progress-line"></div>

                                        <div className="progress-step">
                                            <span>2</span>
                                            <p>Shortlisted</p>
                                        </div>

                                        <div className="progress-line"></div>

                                        <div className="progress-step">
                                            <span>3</span>
                                            <p>Hired</p>
                                        </div>

                                    </div>
                                )}

                                {application.status === "SHORTLISTED" && (
                                    <div className="application-progress">

                                        <div className="progress-step active">
                                            <span>✓</span>
                                            <p>Applied</p>
                                        </div>

                                        <div className="progress-line active"></div>

                                        <div className="progress-step active">
                                            <span>✓</span>
                                            <p>Shortlisted</p>
                                        </div>

                                        <div className="progress-line"></div>

                                        <div className="progress-step">
                                            <span>3</span>
                                            <p>Hired</p>
                                        </div>

                                    </div>
                                )}

                                {application.status === "HIRED" && (
                                    <div className="application-progress">

                                        <div className="progress-step active">
                                            <span>✓</span>
                                            <p>Applied</p>
                                        </div>

                                        <div className="progress-line active"></div>

                                        <div className="progress-step active">
                                            <span>✓</span>
                                            <p>Shortlisted</p>
                                        </div>

                                        <div className="progress-line active"></div>

                                        <div className="progress-step active">
                                            <span>✓</span>
                                            <p>Hired</p>
                                        </div>

                                    </div>
                                )}

                                {application.status === "REJECTED" && (
                                    <div className="rejected-application-message">
                                        This application was not selected.
                                    </div>
                                )}

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default CandidateDashboard;