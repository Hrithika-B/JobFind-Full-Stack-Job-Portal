import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../services/api";

function EditJob() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        skills: "",
        jobType: "Full Time"
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadJob();
    }, [id]);

    async function loadJob() {

        try {

            setLoading(true);
            setMessage("");

            const response = await api.get(`/jobs/${id}`);

            setForm({
                title: response.data.title || "",
                description: response.data.description || "",
                location: response.data.location || "",
                salary: response.data.salary || "",
                skills: response.data.skills || "",
                jobType: response.data.jobType || "Full Time"
            });

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to load job."
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

        if (form.title.trim().length < 3) {
            setMessage("Job title must contain at least 3 characters.");
            return;
        }

        if (form.description.trim().length < 10) {
            setMessage("Job description must contain at least 10 characters.");
            return;
        }

        if (form.location.trim().length < 2) {
            setMessage("Please enter a valid location.");
            return;
        }

        if (!form.salary || Number(form.salary) <= 0) {
            setMessage("Salary must be greater than 0.");
            return;
        }

        if (form.skills.trim().length < 2) {
            setMessage("Please enter at least one skill.");
            return;
        }

        try {

            setSaving(true);

            await api.put(
                `/jobs/${id}`,
                {
                    title: form.title.trim(),
                    description: form.description.trim(),
                    location: form.location.trim(),
                    salary: Number(form.salary),
                    skills: form.skills.trim(),
                    jobType: form.jobType
                }
            );

            navigate("/recruiter/dashboard");

        } catch (error) {

            console.log(error.response);

            setMessage(
                error.response?.data?.error ||
                "Unable to update job."
            );

        } finally {

            setSaving(false);

        }
    }

    if (loading) {

        return (
            <div className="edit-job-page">
                <p>Loading job...</p>
            </div>
        );

    }

    return (
        <div className="edit-job-page">

            <div className="edit-job-header">

                <span>RECRUITER</span>

                <h1>Edit Job</h1>

                <p>
                    Update the details of your job posting.
                </p>

            </div>

            <div className="edit-job-card">

                <form
                    className="edit-job-form"
                    onSubmit={handleSubmit}
                >

                    <div className="edit-form-section">

                        <h2>Job Information</h2>

                        <p>
                            Make changes to the job details below.
                        </p>

                    </div>

                    <div className="edit-form-field">

                        <label>Job Title</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Java Full Stack Developer"
                            value={form.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="edit-form-field">

                        <label>Job Description</label>

                        <textarea
                            name="description"
                            placeholder="Describe the role, responsibilities and requirements..."
                            value={form.description}
                            onChange={handleChange}
                            rows="6"
                            required
                        />

                    </div>

                    <div className="edit-form-row">

                        <div className="edit-form-field">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                placeholder="e.g. Hyderabad"
                                value={form.location}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="edit-form-field">

                            <label>Salary</label>

                            <input
                                type="number"
                                name="salary"
                                placeholder="e.g. 600000"
                                min="1"
                                value={form.salary}
                                onChange={handleChange}
                                required
                            />

                        </div>

                    </div>

                    <div className="edit-form-row">

                        <div className="edit-form-field">

                            <label>Skills</label>

                            <input
                                type="text"
                                name="skills"
                                placeholder="Java, Spring Boot, MySQL"
                                value={form.skills}
                                onChange={handleChange}
                                required
                            />

                            <small>
                                Separate multiple skills using commas.
                            </small>

                        </div>

                        <div className="edit-form-field">

                            <label>Job Type</label>

                            <select
                                name="jobType"
                                value={form.jobType}
                                onChange={handleChange}
                            >

                                <option value="Full Time">
                                    Full Time
                                </option>

                                <option value="Part Time">
                                    Part Time
                                </option>

                                <option value="Internship">
                                    Internship
                                </option>

                            </select>

                        </div>

                    </div>

                    {message && (
                        <div className="edit-job-error">
                            {message}
                        </div>
                    )}

                    <div className="edit-job-actions">

                        <button
                            type="button"
                            className="edit-cancel-button"
                            onClick={() =>
                                navigate("/recruiter/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="edit-submit-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving Changes..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditJob;