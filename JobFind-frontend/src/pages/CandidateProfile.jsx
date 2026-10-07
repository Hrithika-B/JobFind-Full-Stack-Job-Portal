import { useEffect, useState } from "react";
import api from "../services/api";

function CandidateProfile() {

    const userId = localStorage.getItem("userId");

    const [resumeFile, setResumeFile] = useState(null);
    const [resumeMessage, setResumeMessage] = useState("");
    const [candidateId, setCandidateId] = useState(null);

    const [form, setForm] = useState({
        phone: "",
        skills: "",
        education: "",
        resume: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            setLoading(true);
            setError("");

            const response =
                await api.get(`/candidates/user/${userId}`);

            if (response.data) {

                setCandidateId(response.data.id);

                localStorage.setItem(
                    "candidateId",
                    response.data.id
                );

                setForm({
                    phone: response.data.phone || "",
                    skills: response.data.skills || "",
                    education: response.data.education || "",
                    resume: response.data.resume || ""
                });
            }

        } catch (err) {

            setError(
                err.response?.data?.error ||
                "Unable to load profile."
            );

        } finally {

            setLoading(false);
        }
    }

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        setMessage("");
        setError("");

        if (form.phone.trim().length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        if (form.skills.trim().length < 2) {
            setError("Please enter your skills.");
            return;
        }

        if (form.education.trim().length < 2) {
            setError("Please enter your education details.");
            return;
        }

        try {

            setSaving(true);

            let response;

            if (candidateId) {

                response = await api.put(
                    `/candidates/${candidateId}`,
                    {
                        phone: form.phone.trim(),
                        skills: form.skills.trim(),
                        education: form.education.trim(),
                        resume: form.resume
                    }
                );

            } else {

                response = await api.post(
                    "/candidates",
                    {
                        phone: form.phone.trim(),
                        skills: form.skills.trim(),
                        education: form.education.trim(),
                        resume: form.resume
                    }
                );
            }

            setCandidateId(response.data.id);

            localStorage.setItem(
                "candidateId",
                response.data.id
            );

            setMessage("Profile updated successfully.");

        } catch (err) {

            setError(
                err.response?.data?.error ||
                "Unable to save profile."
            );

        } finally {

            setSaving(false);
        }
    }

    async function handleResumeUpload() {

        if (!resumeFile) {
            setResumeMessage("Please select a PDF file.");
            return;
        }

        if (resumeFile.type !== "application/pdf") {
            setResumeMessage("Only PDF files are allowed.");
            return;
        }

        if (resumeFile.size > 5 * 1024 * 1024) {
            setResumeMessage("Resume size must be less than 5 MB.");
            return;
        }

        if (!candidateId) {
            setResumeMessage(
                "Please save your profile before uploading a resume."
            );
            return;
        }

        try {

            setUploading(true);
            setResumeMessage("");

            const formData = new FormData();

            formData.append("file", resumeFile);

            const response = await api.post(
                `/candidates/${candidateId}/resume`,
                formData
            );

            setForm({
                ...form,
                resume: response.data.resume || ""
            });

            setResumeFile(null);

            setResumeMessage(
                "Resume uploaded successfully."
            );

        } catch (error) {

            setResumeMessage(
                error.response?.data?.error ||
                "Failed to upload resume."
            );

        } finally {

            setUploading(false);
        }
    }

    async function handleViewResume() {

        try {

            const response = await api.get(
                `/candidates/${candidateId}/resume`,
                {
                    responseType: "blob"
                }
            );

            const fileURL =
                URL.createObjectURL(response.data);

            window.open(fileURL, "_blank");

        } catch (error) {

            setResumeMessage(
                `Unable to view resume. Status: ${
                    error.response?.status || "Unknown"
                }`
            );
        }
    }

    async function handleDownloadResume() {

        try {

            const response = await api.get(
                `/candidates/${candidateId}/resume/download`,
                {
                    responseType: "blob"
                }
            );

            const fileURL =
                URL.createObjectURL(response.data);

            const link =
                document.createElement("a");

            link.href = fileURL;

            link.download =
                form.resume || "resume.pdf";

            document.body.appendChild(link);

            link.click();

            link.remove();

            URL.revokeObjectURL(fileURL);

        } catch (error) {

            setResumeMessage(
                `Unable to download resume. Status: ${
                    error.response?.status || "Unknown"
                }`
            );
        }
    }

    if (loading) {

        return (
            <div className="profile-loading">

                <div className="profile-spinner"></div>

                <p>
                    Loading your profile...
                </p>

            </div>
        );
    }

    return (
       <div className="profile-page candidate-profile-page">

            <section className="profile-header">

                <div className="profile-heading">

                    <div className="profile-avatar">
                        C
                    </div>

                    <div>

                        <span className="profile-label">
                            CANDIDATE PROFILE
                        </span>

                        <h1>
                            Build your professional profile
                        </h1>

                        <p>
                            Keep your information updated so recruiters
                            can learn more about you.
                        </p>

                    </div>

                </div>

            </section>

            <main className="profile-content">

                <div className="profile-card">

                    <div className="profile-card-header">

                        <div>

                            <h2>
                                Personal & Professional Information
                            </h2>

                            <p>
                                Add your details to complete your
                                candidate profile.
                            </p>

                        </div>

                    </div>

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="profile-form-grid">

                            <div className="profile-form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="profile-form-group">

                                <label>
                                    Skills
                                </label>

                                <input
                                    type="text"
                                    name="skills"
                                    placeholder="Java, Spring Boot, React, MySQL"
                                    value={form.skills}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="profile-form-group">

                            <label>
                                Education
                            </label>

                            <input
                                type="text"
                                name="education"
                                placeholder="B.Tech - Computer Science and Engineering"
                                value={form.education}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="profile-form-group">

                            <label>
                                Resume
                            </label>

                            <div className="resume-upload-box">

                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    onChange={(e) =>
                                        setResumeFile(
                                            e.target.files[0]
                                        )
                                    }
                                />

                                <span className="file-help">
                                    PDF only • Maximum 5 MB
                                </span>

                            </div>

                            {resumeFile && (

                                <div className="selected-file">

                                    Selected: {resumeFile.name}

                                </div>
                            )}

                            {form.resume && candidateId && (

                                <div className="uploaded-resume-section">

                                    <div className="uploaded-resume">

                                        ✓ Resume uploaded

                                    </div>

                                    <div className="resume-actions">

                                        <button
                                            type="button"
                                            className="resume-view-button"
                                            onClick={handleViewResume}
                                        >
                                            View Resume
                                        </button>

                                        <button
                                            type="button"
                                            className="resume-download-button"
                                            onClick={handleDownloadResume}
                                        >
                                            Download
                                        </button>

                                    </div>

                                </div>
                            )}

                            <button
                                type="button"
                                className="resume-upload-button"
                                onClick={handleResumeUpload}
                                disabled={uploading}
                            >
                                {uploading
                                    ? "Uploading..."
                                    : "Upload Resume"}
                            </button>

                            {resumeMessage && (

                                <div className="resume-message">
                                    {resumeMessage}
                                </div>
                            )}

                        </div>

                        {message && (

                            <div className="profile-success">
                                ✓ {message}
                            </div>
                        )}

                        {error && (

                            <div className="profile-error">
                                {error}
                            </div>
                        )}

                        <div className="profile-form-footer">

                            <span>
                                Keep your profile information up to date.
                            </span>

                            <button
                                type="submit"
                                className="profile-save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Profile"}
                            </button>

                        </div>

                    </form>

                </div>

                <aside className="profile-side-card">

                    <div className="side-card-icon">
                        ✓
                    </div>

                    <h3>
                        Complete your profile
                    </h3>

                    <p>
                        A complete profile helps recruiters understand
                        your skills, education and experience.
                    </p>

                    <div className="profile-tips">

                        <div>
                            <span>01</span>
                            <p>
                                Keep your phone number updated
                            </p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>
                                List your relevant technical skills
                            </p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>
                                Add your latest education details
                            </p>
                        </div>

                        <div>
                            <span>04</span>
                            <p>
                                Keep your resume information current
                            </p>
                        </div>

                    </div>

                </aside>

            </main>

        </div>
    );
}

export default CandidateProfile;