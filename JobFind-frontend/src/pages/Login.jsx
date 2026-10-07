import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);
            localStorage.setItem("userId", response.data.userId);

            if (response.data.role === "CANDIDATE") {
                navigate("/candidate/dashboard");
            } else if (response.data.role === "RECRUITER") {
                navigate("/recruiter/dashboard");
            }

        } catch (error) {
            setMessage(
                error.response?.data?.error ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-header">
                    <span className="auth-label">WELCOME BACK</span>
                    <h1>Sign in to JobFind</h1>
                    <p>
                        Access your account and continue your career journey.
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleLogin}>

                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
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
                        {loading ? "Signing in..." : "Sign In"}
                    </button>

                </form>

                <div className="auth-footer">
                    <p>
                        Don't have an account?
                        <Link to="/register"> Create an account</Link>
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Login;