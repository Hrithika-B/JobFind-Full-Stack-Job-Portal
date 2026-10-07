import { Link } from "react-router-dom";

function Home() {
    return (
       <div className="home home-page">

            <section className="hero-section">

                <div className="hero-content">

                    <span className="hero-label">
                        JOBFIND
                    </span>

                    <h1>
    Build your
    <span> career </span>
    with the right opportunity.
</h1>

                    
                        <p>
    Explore opportunities that match your skills,
    apply with ease, and keep track of your career
    journey in one place.
</p>
                

                    <div className="hero-buttons">

                        <Link
                            to="/jobs"
                            className="primary-button"
                        >
                            Browse Jobs →
                        </Link>

                        <Link
                            to="/register"
                            className="secondary-button"
                        >
                            Create Account
                        </Link>

                    </div>

                    <div className="hero-trust">

                        <span>✓ Easy Job Search</span>
                        <span>✓ Simple Applications</span>
                        <span>✓ Secure Authentication</span>

                    </div>

                </div>

                <div className="hero-visual">

                    <div className="job-preview-card">

                        <div className="job-card-top">

                            <div className="company-icon">
                                J
                            </div>

                            <div>

                                <h3>
                                    Java Developer
                                </h3>

                                <p>
                                    Technology Company
                                </p>

                            </div>

                            <span className="bookmark">
                                ♡
                            </span>

                        </div>

                        <div className="job-info">

                            <span>
                                📍 Hyderabad
                            </span>

                            <span>
                                💼 Full Time
                            </span>

                        </div>

                        <div className="job-skills">

                            <span>Java</span>
                            <span>Spring Boot</span>
                            <span>MySQL</span>

                        </div>

                        <div className="job-card-bottom">

                            <strong>
                                ₹6 - 10 LPA
                            </strong>

                            <Link to="/jobs">
    View Job →
</Link>

                        </div>

                    </div>

                    <div className="floating-card application-card">

                        <div className="floating-icon">
                            ✓
                        </div>

                        <div>

                            <strong>
                                Easy Applications
                            </strong>

                            <p>
                                Track your applications
                            </p>

                        </div>

                    </div>

                    <div className="floating-card secure-card">

                        <div className="floating-icon">
                            🔒
                        </div>

                        <div>

                            <strong>
                                Secure Platform
                            </strong>

                            <p>
                                JWT Authentication
                            </p>

                        </div>

                    </div>

                </div>

            </section>

            <section className="features-section">

                <div className="section-heading">

                    <span>
                        WHY JOBFIND?
                    </span>

                    <h2>
                        Everything you need for your job search
                    </h2>

                    <p>
                        A simple platform designed to connect
                        candidates and recruiters.
                    </p>

                </div>

                <div className="feature-grid">

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔎
                        </div>

                        <h3>
                            Find Opportunities
                        </h3>

                        <p>
                            Search and discover jobs based on
                            your skills, location and career goals.
                        </p>

                        <Link to="/jobs">
                            Explore Jobs →
                        </Link>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon">
                            📄
                        </div>

                        <h3>
                            Apply Easily
                        </h3>

                        <p>
                            Apply for suitable positions and
                            track your application status.
                        </p>

                        <Link to="/jobs">
                            Start Applying →
                        </Link>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon">
                            🏢
                        </div>

                        <h3>
                            For Recruiters
                        </h3>

                        <p>
                            Post opportunities and manage
                            candidate applications efficiently.
                        </p>

                        <Link to="/register">
                            Join as Recruiter →
                        </Link>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon">
                            🔐
                        </div>

                        <h3>
                            Secure Platform
                        </h3>

                        <p>
                            JWT-based authentication helps protect
                            accounts and application data.
                        </p>

                        <Link to="/login">
                            Login Securely →
                        </Link>

                    </div>

                </div>

            </section>

            <section className="cta-section">

                <div>

                    <span>
                        READY TO GET STARTED?
                    </span>

                    <h2>
                        Your next opportunity is just a search away.
                    </h2>

                    <p>
                        Explore available jobs and discover roles
                        that match your skills.
                    </p>

                </div>

                <Link
                    to="/jobs"
                    className="cta-button"
                >
                    Explore Jobs →
                </Link>

            </section>

            <footer className="home-footer">

                <div>

                    <h3>
                        JobFind
                    </h3>

                    <p>
                        Connecting talented candidates with
                        meaningful opportunities.
                    </p>

                </div>

               

            </footer>

        </div>
    );
}

export default Home;