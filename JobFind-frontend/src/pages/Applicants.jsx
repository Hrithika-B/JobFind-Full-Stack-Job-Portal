
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function Applicants() {
    const { jobId } = useParams();

    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

    useEffect(() => {
        loadApplicants();
    }, [jobId]);

    async function loadApplicants() {
        try {
            setLoading(true);
            setMessage("");

            const response = await api.get(`/applications/job/${jobId}`);

            setApplications(response.data);
        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                "Unable to load applicants."
            );
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(applicationId, status) {

        if (
            status === "REJECTED" &&
            !window.confirm(
                "Are you sure you want to reject this applicant?"
            )
        ) {
            return;
        }

        if (
            status === "HIRED" &&
            !window.confirm(
                "Are you sure you want to mark this applicant as Hired?"
            )
        ) {
            return;
        }

        try {
            setUpdatingId(applicationId);
            setMessage("");

            await api.put(
                `/applications/${applicationId}/status?status=${status}`
            );

            await loadApplicants();

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to update status."
            );

        } finally {
            setUpdatingId(null);
        }
    }

    async function handleViewResume(applicationId) {
        try {
            const response = await api.get(
                `/applications/${applicationId}/resume`,
                {
                    responseType: "blob"
                }
            );

            const fileURL = URL.createObjectURL(response.data);

            window.open(fileURL, "_blank");

        } catch (error) {
            setMessage("Unable to view resume.");
        }
    }

    async function handleDownloadResume(
        applicationId,
        resumeName
    ) {
        try {
            const response = await api.get(
                `/applications/${applicationId}/resume/download`,
                {
                    responseType: "blob"
                }
            );

            const fileURL = URL.createObjectURL(response.data);

            const link = document.createElement("a");

            link.href = fileURL;
            link.download = resumeName || "resume.pdf";

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(fileURL);

        } catch (error) {
            setMessage("Unable to download resume.");
        }
    }

    function formatDate(date) {
        if (!date) {
            return "Not available";
        }

        return new Date(date).toLocaleDateString();
    }

    function renderActionButtons(application) {

        const status = application.status;

        if (status === "HIRED") {
            return (
                <div className="applicant-hired-message">
                    ✓ Candidate Hired
                </div>
            );
        }

        if (status === "REJECTED") {
            return (
                <div className="applicant-rejected-message">
                    ✕ Application Rejected
                </div>
            );
        }

        if (status === "SHORTLISTED") {
            return (
                <div className="applicant-actions">

                    <button
                        className="hire-button"
                        disabled={
                            updatingId === application.id
                        }
                        onClick={() =>
                            updateStatus(
                                application.id,
                                "HIRED"
                            )
                        }
                    >
                        {updatingId === application.id
                            ? "Updating..."
                            : "Hire"}
                    </button>

                    <button
                        className="reject-button"
                        disabled={
                            updatingId === application.id
                        }
                        onClick={() =>
                            updateStatus(
                                application.id,
                                "REJECTED"
                            )
                        }
                    >
                        Reject
                    </button>

                </div>
            );
        }

        return (
            <div className="applicant-actions">

                <button
                    className="shortlist-button"
                    disabled={
                        updatingId === application.id
                    }
                    onClick={() =>
                        updateStatus(
                            application.id,
                            "SHORTLISTED"
                        )
                    }
                >
                    {updatingId === application.id
                        ? "Updating..."
                        : "Shortlist"}
                </button>

                <button
                    className="reject-button"
                    disabled={
                        updatingId === application.id
                    }
                    onClick={() =>
                        updateStatus(
                            application.id,
                            "REJECTED"
                        )
                    }
                >
                    Reject
                </button>

            </div>
        );
    }

    if (loading) {
        return (
            <div className="applicants-page">

                <div className="applicants-header">
                    <span>RECRUITER</span>

                    <h1>Applicants</h1>

                    <p>
                        Review candidates who applied for this job.
                    </p>
                </div>

                <div className="applicants-empty">
                    Loading applicants...
                </div>

            </div>
        );
    }

    return (
        <div className="applicants-page">

            <div className="applicants-header">

                <span>RECRUITER</span>

                <h1>Applicants</h1>

                <p>
                    Review candidate profiles, resumes and
                    application status.
                </p>

            </div>

            {message && (
                <div className="applicants-message">
                    {message}
                </div>
            )}

            <div className="applicants-count">

                {applications.length} applicant
                {applications.length !== 1 ? "s" : ""}

            </div>

            {applications.length === 0 ? (

                <div className="applicants-empty">

                    <h3>No applicants yet</h3>

                    <p>
                        Candidates who apply for this job will
                        appear here.
                    </p>

                </div>

            ) : (

                <div className="applicants-grid">

                    {applications.map((application) => (

                        <div
                            className="applicant-card"
                            key={application.id}
                        >

                            <div className="applicant-top">

                                <div className="applicant-avatar">

                                    {(
                                        application.candidate?.user?.name ||
                                        "C"
                                    )
                                        .charAt(0)
                                        .toUpperCase()}

                                </div>

                                <div>

                                    <h3>
                                        {application.candidate?.user?.name ||
                                            "Candidate"}
                                    </h3>

                                    <p>
                                        {application.candidate?.user?.email ||
                                            "Email not available"}
                                    </p>

                                </div>

                            </div>

                            <div className="applicant-details">

                                <div>
                                    <span>Phone</span>

                                    <strong>
                                        {application.candidate?.phone ||
                                            "Not provided"}
                                    </strong>
                                </div>

                                <div>
                                    <span>Education</span>

                                    <strong>
                                        {application.candidate?.education ||
                                            "Not provided"}
                                    </strong>
                                </div>

                                <div className="full-detail">

                                    <span>Skills</span>

                                    <strong>
                                        {application.candidate?.skills ||
                                            "Not provided"}
                                    </strong>

                                </div>

                                <div>

                                    <span>Applied On</span>

                                    <strong>
                                        {formatDate(
                                            application.appliedAt
                                        )}
                                    </strong>

                                </div>

                            </div>

                            <div className="applicant-status">

                                <span>Status</span>

                                <strong
                                    className={`status-${application.status?.toLowerCase()}`}
                                >
                                    {application.status}
                                </strong>

                            </div>

                            {application.candidate?.resume && (

                                <div className="applicant-resume">

                                    <div>

                                        <span>Resume</span>

                                        <strong>
                                            {application.candidate.resume}
                                        </strong>

                                    </div>

                                    <div className="resume-actions">

                                        <button
                                            type="button"
                                            className="resume-view-button"
                                            onClick={() =>
                                                handleViewResume(
                                                    application.id
                                                )
                                            }
                                        >
                                            View Resume
                                        </button>

                                        <button
                                            type="button"
                                            className="resume-download-button"
                                            onClick={() =>
                                                handleDownloadResume(
                                                    application.id,
                                                    application.candidate.resume
                                                )
                                            }
                                        >
                                            Download
                                        </button>

                                    </div>

                                </div>

                            )}

                            {renderActionButtons(application)}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Applicants;
