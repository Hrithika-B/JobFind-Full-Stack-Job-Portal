import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function RecruiterProfile() {

    const navigate = useNavigate();

    const userId =
        localStorage.getItem("userId");

    const [recruiterId, setRecruiterId] =
        useState(localStorage.getItem("recruiterId"));

    const [form, setForm] = useState({
        userId: Number(userId),
        company: "",
        designation: ""
    });

    const [loading, setLoading] =
        useState(true);

    const [message, setMessage] =
        useState("");

    const [existingProfile, setExistingProfile] =
        useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            if (!userId) {
                setMessage("Please login again.");
                setLoading(false);
                return;
            }

            const response =
                await api.get(
                    `/recruiters/user/${userId}`
                );

            const recruiter = response.data;

            setRecruiterId(recruiter.id);

            localStorage.setItem(
                "recruiterId",
                recruiter.id
            );

            setForm({
                userId: Number(userId),
                company: recruiter.company || "",
                designation: recruiter.designation || ""
            });

            setExistingProfile(true);

        } catch (error) {

            if (error.response?.status === 404) {

                setExistingProfile(false);

            } else {

                setMessage(
                    error.response?.data?.error ||
                    "Unable to load profile."
                );
            }

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

        try {

            setMessage("");

            let response;

            if (existingProfile) {

                response = await api.put(
                    `/recruiters/${recruiterId}`,
                    form
                );

                setMessage(
                    "Recruiter profile updated successfully."
                );

            } else {

                response = await api.post(
                    "/recruiters",
                    form
                );

                setRecruiterId(response.data.id);

                localStorage.setItem(
                    "recruiterId",
                    response.data.id
                );

                setExistingProfile(true);

                setMessage(
                    "Recruiter profile created successfully."
                );
            }

            setTimeout(() => {
                navigate("/recruiter/dashboard");
            }, 1000);

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to save profile."
            );
        }
    }

    if (loading) {

        return (
            <div className="form-container">
                <h2>Recruiter Profile</h2>
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="form-container">

            <h2>
                {existingProfile
                    ? "Update Recruiter Profile"
                    : "Recruiter Profile"}
            </h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="company"
                    placeholder="Company"
                    value={form.company}
                    onChange={handleChange}
                    required
                />

                <input
                    name="designation"
                    placeholder="Designation"
                    value={form.designation}
                    onChange={handleChange}
                    required
                />

                <button type="submit">

                    {existingProfile
                        ? "Update Profile"
                        : "Save Profile"}

                </button>

            </form>

            {message && (
                <p>{message}</p>
            )}

        </div>
    );
}

export default RecruiterProfile;