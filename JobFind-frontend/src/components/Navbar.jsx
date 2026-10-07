import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
        localStorage.removeItem("candidateId");
        localStorage.removeItem("recruiterId");

        navigate("/login");
    }

    return (
        <nav className="main-navbar">

            <Link to="/" className="navbar-brand">
                Job<span>Find</span>
            </Link>

            <div className="navbar-links">

                <Link to="/">
    🏠 Home
</Link>

                <Link to="/jobs">
    💼 Find Jobs
</Link>

        {token && role === "CANDIDATE" && (
    <>
        <Link to="/candidate/dashboard">
            📊 Dashboard
        </Link>

        <Link to="/candidate/profile">
            👤 Profile
        </Link>
    </>
)}

                {token && role === "RECRUITER" && (
                    <>
                        <Link to="/recruiter/dashboard">
                            Dashboard
                        </Link>

                        <Link to="/recruiter/profile">
                            Profile
                        </Link>
                    </>
                )}

                {!token && (
                    <>
                        <Link to="/login" className="navbar-login">
    🔐 Login
</Link>

                        <Link to="/register" className="navbar-register">
    ✨ Register
</Link>
                    </>
                )}

                {token && (
                  <button
    className="navbar-logout"
    onClick={handleLogout}
>
    🚪 Logout
</button>
                )}

            </div>

        </nav>
    );
}

export default Navbar;