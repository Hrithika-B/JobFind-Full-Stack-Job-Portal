import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("CANDIDATE");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleRegister(e) {

        e.preventDefault();

        setMessage("");

        const trimmedName = name.trim();
        const trimmedEmail = email.trim();

        if (trimmedName.length < 3) {
            setMessage("Name must contain at least 3 characters.");
            return;
        }

        if (!trimmedEmail) {
            setMessage("Please enter your email address.");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (!role) {
            setMessage("Please select an account type.");
            return;
        }

        try {

            setLoading(true);

            await api.post("/auth/register", {
                name: trimmedName,
                email: trimmedEmail,
                password,
                role
            });

            navigate("/login");

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Registration failed. Please try again."
            );

        } finally {

            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            <div className="auth-card register-card">

                <div className="auth-header">

                    <span className="auth-label">
                        GET STARTED
                    </span>

                    <h1>
                        Create your account
                    </h1>

                    <p>
                        Join JobFind and take the next step
                        in your career.
                    </p>

                </div>

                <form
                    className="auth-form"
                    onSubmit={handleRegister}
                >

                    <div className="form-group">

                        <label>
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            minLength="6"
                            required
                        />

                        <small className="input-help">
                            Minimum 6 characters
                        </small>

                    </div>

                    <div className="form-group">

                        <label>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Account Type
                        </label>

                        <div className="role-options">

                            <label
                                className={`role-option ${
                                    role === "CANDIDATE"
                                        ? "selected"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="role"
                                    value="CANDIDATE"
                                    checked={
                                        role === "CANDIDATE"
                                    }
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                />

                                <div>

                                    <strong>
                                        Candidate
                                    </strong>

                                    <span>
                                        Find jobs and apply
                                    </span>

                                </div>

                            </label>

                            <label
                                className={`role-option ${
                                    role === "RECRUITER"
                                        ? "selected"
                                        : ""
                                }`}
                            >

                                <input
                                    type="radio"
                                    name="role"
                                    value="RECRUITER"
                                    checked={
                                        role === "RECRUITER"
                                    }
                                    onChange={(e) =>
                                        setRole(e.target.value)
                                    }
                                />

                                <div>

                                    <strong>
                                        Recruiter
                                    </strong>

                                    <span>
                                        Post jobs and hire talent
                                    </span>

                                </div>

                            </label>

                        </div>

                    </div>

                    {message && (

                        <div className="auth-error">
                            {message}
                        </div>

                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating account..."
                            : "Create Account"}
                    </button>

                </form>

                <div className="auth-footer">

                    <p>

                        Already have an account?

                        <Link to="/login">
                            {" "}Sign in
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;