import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateJob() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
    jobType: "Full Time",
    education: "Any Graduate",
  areaOfInterest: "Software Developer"
});

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

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

            setLoading(true);
await api.post("/jobs", {
    title: form.title.trim(),
    description: form.description.trim(),
    location: form.location.trim(),
    salary: Number(form.salary),
    skills: form.skills.trim(),
    jobType: form.jobType,
    education: form.education,
    areaOfInterest: form.areaOfInterest
});
            navigate("/recruiter/dashboard");

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to create job."
            );

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="create-job-page">

            <div className="create-job-header">

                <span>RECRUITER</span>

                <h1>Post a New Job</h1>

                <p>
                    Create a job posting and start receiving applications
                    from candidates.
                </p>

            </div>

            <div className="create-job-card">

                <form
                    className="create-job-form"
                    onSubmit={handleSubmit}
                >

                    <div className="form-section">

                        <h2>Job Information</h2>

                        <p>
                            Provide the basic information about this position.
                        </p>

                    </div>

                    <div className="form-field">

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

                    <div className="form-field">

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

                    <div className="form-row">

                        <div className="form-field">

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

                        <div className="form-field">

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

                    <div className="form-row">

                        <div className="form-field">

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

                        <div className="form-field">

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
                    <div className="form-field">

    <label>Education / Qualification</label>

    <select
        name="education"
        value={form.education}
        onChange={handleChange}
    >

        <option value="Any Graduate">
            Any Graduate
        </option>

        <option value="BCA">
            BCA
        </option>

        <option value="B.Sc">
            B.Sc
        </option>

        <option value="B.E / B.Tech">
            B.E / B.Tech
        </option>

        <option value="MCA">
            MCA
        </option>

        <option value="M.Tech">
            M.Tech
        </option>

        <option value="MBA">
            MBA
        </option>

        <option value="Any Postgraduate">
            Any Postgraduate
        </option>

    </select>

</div>
<div className="form-field">

    <label>Area of Interest</label>

    <select
        name="areaOfInterest"
        value={form.areaOfInterest}
        onChange={handleChange}
    >

        <option value="MERN Stack Developer">
            MERN Stack Developer
        </option>

        <option value="Full Stack Developer">
            Full Stack Developer
        </option>

        <option value="Frontend Developer">
            Frontend Developer
        </option>

        <option value="Backend Developer">
            Backend Developer
        </option>

        <option value="Java Developer">
            Java Developer
        </option>

        <option value="Python Developer">
            Python Developer
        </option>

        <option value="Software Developer">
            Software Developer
        </option>

        <option value="Data Analyst">
            Data Analyst
        </option>

        <option value="Data Scientist">
            Data Scientist
        </option>

        <option value="ML Engineer">
            ML Engineer
        </option>

        <option value="QA / Testing">
            QA / Testing
        </option>

        <option value="DevOps Engineer">
            DevOps Engineer
        </option>

        <option value="UI/UX Designer">
            UI/UX Designer
        </option>

        <option value="Cybersecurity">
            Cybersecurity
        </option>

        <option value="Accountant">
            Accountant
        </option>

        <option value="Accounts Executive">
            Accounts Executive
        </option>

        <option value="Finance Executive">
            Finance Executive
        </option>

        <option value="HR Executive">
            HR Executive
        </option>

        <option value="Recruiter">
            Recruiter
        </option>

        <option value="Marketing Executive">
            Marketing Executive
        </option>

        <option value="Sales Executive">
            Sales Executive
        </option>

        <option value="Business Development Executive">
            Business Development Executive
        </option>

        <option value="Operations Executive">
            Operations Executive
        </option>

        <option value="Customer Support Executive">
            Customer Support Executive
        </option>

        <option value="Administrative Executive">
            Administrative Executive
        </option>

        <option value="Teacher / Trainer">
            Teacher / Trainer
        </option>

        <option value="Content Writer">
            Content Writer
        </option>

    </select>

</div>

                    {message && (
                        <div className="create-job-error">
                            {message}
                        </div>
                    )}

                    <div className="create-job-actions">

                        <button
                            type="button"
                            className="cancel-job-button"
                            onClick={() =>
                                navigate("/recruiter/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-job-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Job..."
                                : "Create Job"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default CreateJob;