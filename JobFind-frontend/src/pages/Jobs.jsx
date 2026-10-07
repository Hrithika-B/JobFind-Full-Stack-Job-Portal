
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import api from "../services/api";

function Jobs() {

    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    const [locationFilter, setLocationFilter] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [jobTypeFilter, setJobTypeFilter] = useState("");
    const [skillFilter, setSkillFilter] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalJobs, setTotalJobs] = useState(0);

    const pageSize = 6;

    useEffect(() => {
        loadJobs(0);
    }, []);

    async function loadJobs(pageNumber) {

        try {

            setLoading(true);
            setMessage("");

            const response = await api.get(
                `/jobs/page?page=${pageNumber}&size=${pageSize}`
            );

            setJobs(response.data.content);
            setPage(response.data.number);
            setTotalPages(response.data.totalPages);
            setTotalJobs(response.data.totalElements);

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to load jobs."
            );

        } finally {

            setLoading(false);

        }
    }

    async function loadSearchResults(pageNumber) {

        try {

            setLoading(true);
            setMessage("");

            const params = new URLSearchParams();

            params.append("keyword", search.trim());
            params.append("page", pageNumber);
            params.append("size", pageSize);

            const response = await api.get(
                `/jobs/search?${params.toString()}`
            );

            setJobs(response.data.content);
            setPage(response.data.number);
            setTotalPages(response.data.totalPages);
            setTotalJobs(response.data.totalElements);

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to search jobs."
            );

        } finally {

            setLoading(false);

        }
    }

    async function applyFilters() {

        try {

            setLoading(true);
            setMessage("");

            const params = new URLSearchParams();

            if (locationFilter) {
                params.append("location", locationFilter);
            }

            if (roleFilter) {
                params.append("areaOfInterest", roleFilter);
            }

            if (jobTypeFilter) {
                params.append("jobType", jobTypeFilter);
            }

            if (skillFilter) {
                params.append("skill", skillFilter);
            }

            params.append("page", "0");
            params.append("size", pageSize);

            const response = await api.get(
                `/jobs/filter?${params.toString()}`
            );

            setJobs(response.data.content);
            setPage(response.data.number);
            setTotalPages(response.data.totalPages);
            setTotalJobs(response.data.totalElements);

        } catch (error) {

            setMessage(
                error.response?.data?.error ||
                "Unable to filter jobs."
            );

        } finally {

            setLoading(false);

        }
    }

    function handleSearch(e) {

    e.preventDefault();

   

    if (!search.trim()) {
        loadJobs(0);
        return;
    }

    loadSearchResults(0);
}

    function clearSearch() {

        setSearch("");
        loadJobs(0);
    }

    function handlePrevious() {

        if (page === 0) {
            return;
        }

        if (search.trim()) {
            loadSearchResults(page - 1);
        } else {
            loadJobs(page - 1);
        }
    }

    function handleNext() {

        if (page >= totalPages - 1) {
            return;
        }

        if (search.trim()) {
            loadSearchResults(page + 1);
        } else {
            loadJobs(page + 1);
        }
    }

    if (loading) {

        return (
            <div className="jobs-loading">

                <div className="loading-spinner"></div>

                <p>Loading available jobs...</p>

            </div>
        );
    }

    return (
        <div className="jobs-page">

            {/* HEADER */}

            <section className="jobs-header">

                <div className="jobs-header-content">

                    <span className="jobs-label">
                        CAREER OPPORTUNITIES
                    </span>

                    <h1>
                        Find your next
                        <span> opportunity.</span>
                    </h1>

                    <p>
                        Explore job opportunities from companies looking
                        for talented people like you.
                    </p>

                </div>

            </section>


            {/* CONTENT */}

            <section className="jobs-content">

                {message && (
                    <div className="jobs-message">
                        {message}
                    </div>
                )}


                {/* FILTERS + JOB RESULTS */}

                <div className="jobs-layout">


                    {/* FILTER SIDEBAR */}

                    <aside className="jobs-filters">

                        <div className="filters-header">

                            <h3>
                                Filters
                            </h3>

                            <button
                                type="button"
                                onClick={() => {
                                    setLocationFilter("");
                                    setRoleFilter("");
                                    setJobTypeFilter("");
                                    setSkillFilter("");
                                    loadJobs(0);
                                }}
                            >
                                Clear filters
                            </button>

                        </div>


                        {/* LOCATION */}

                        <div className="filter-group">

                            <label>
                                📍 Location
                            </label>

                            <select
                                value={locationFilter}
                                onChange={(e) =>
                                    setLocationFilter(e.target.value)
                                }
                            >

                                <option value="">
                                    All Locations
                                </option>

                                <option value="Bengaluru">
                                    Bengaluru
                                </option>

                                <option value="Bangalore">
                                    Bangalore
                                </option>

                                <option value="Hyderabad">
                                    Hyderabad
                                </option>

                                <option value="Mumbai">
                                    Mumbai
                                </option>

                                <option value="Chennai">
                                    Chennai
                                </option>

                                <option value="Pune">
                                    Pune
                                </option>

                            </select>

                        </div>


                        {/* AREA OF INTEREST */}

                        <div className="filter-group">

                            <label>
                                🎯 Area of Interest
                            </label>

                            <select
                                value={roleFilter}
                                onChange={(e) =>
                                    setRoleFilter(e.target.value)
                                }
                            >

                                <option value="">
                                    All Roles
                                </option>

                                {/* IT ROLES */}

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


                                {/* NON-IT ROLES */}

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


                        {/* JOB TYPE */}

                        <div className="filter-group">

                            <label>
                                💼 Job Type
                            </label>

                            <select
                                value={jobTypeFilter}
                                onChange={(e) =>
                                    setJobTypeFilter(e.target.value)
                                }
                            >

                                <option value="">
                                    All Job Types
                                </option>

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


                        {/* SKILLS */}

                        <div className="filter-group">

                            <label>
                                🛠️ Skills
                            </label>

                            <select
                                value={skillFilter}
                                onChange={(e) =>
                                    setSkillFilter(e.target.value)
                                }
                            >

                                <option value="">
                                    All Skills
                                </option>

                                {/* IT SKILLS */}

                                <option value="Java">
                                    Java
                                </option>

                                <option value="Spring Boot">
                                    Spring Boot
                                </option>

                                <option value="React">
                                    React
                                </option>

                                <option value="JavaScript">
                                    JavaScript
                                </option>

                                <option value="HTML">
                                    HTML
                                </option>

                                <option value="CSS">
                                    CSS
                                </option>

                                <option value="Python">
                                    Python
                                </option>

                                <option value="SQL">
                                    SQL
                                </option>

                                <option value="MySQL">
                                    MySQL
                                </option>

                                <option value="MongoDB">
                                    MongoDB
                                </option>

                                <option value="Node.js">
                                    Node.js
                                </option>

                                <option value="Express.js">
                                    Express.js
                                </option>

                                <option value="Git">
                                    Git
                                </option>

                                <option value="GitHub">
                                    GitHub
                                </option>

                                <option value="Power BI">
                                    Power BI
                                </option>

                                <option value="Excel">
                                    Excel
                                </option>


                                {/* NON-IT SKILLS */}

                                <option value="Accounting">
                                    Accounting
                                </option>

                                <option value="Tally">
                                    Tally
                                </option>

                                <option value="GST">
                                    GST
                                </option>

                                <option value="MS Excel">
                                    MS Excel
                                </option>

                                <option value="Financial Reporting">
                                    Financial Reporting
                                </option>

                                <option value="Communication">
                                    Communication
                                </option>

                                <option value="Customer Service">
                                    Customer Service
                                </option>

                                <option value="Sales">
                                    Sales
                                </option>

                                <option value="Marketing">
                                    Marketing
                                </option>

                                <option value="Digital Marketing">
                                    Digital Marketing
                                </option>

                                <option value="Recruitment">
                                    Recruitment
                                </option>

                                <option value="Human Resources">
                                    Human Resources
                                </option>

                                <option value="Business Development">
                                    Business Development
                                </option>

                                <option value="Negotiation">
                                    Negotiation
                                </option>

                                <option value="Content Writing">
                                    Content Writing
                                </option>

                                <option value="MS Office">
                                    MS Office
                                </option>

                                <option value="Time Management">
                                    Time Management
                                </option>

                            </select>

                        </div>


                        {/* APPLY FILTERS */}

                        <button
                            type="button"
                            className="apply-filters-button"
                            onClick={applyFilters}
                        >
                            🔍 Apply Filters
                        </button>

                    </aside>


                    {/* JOB RESULTS */}

                    <div className="jobs-results">


                        {/* SEARCH */}

                        <form
                            className="jobs-search"
                            onSubmit={handleSearch}
                        >

                            <div className="search-input-wrapper">

                                <span className="search-icon">
                                    🔍
                                </span>

                                <input
                                    type="text"
                                    placeholder="Search by job title, location or skills"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                />

                            </div>

                            <button
                                type="submit"
                                className="search-button"
                            >
                                Search Jobs
                            </button>

                            {search && (
                                <button
                                    type="button"
                                    className="clear-button"
                                    onClick={clearSearch}
                                >
                                    Clear
                                </button>
                            )}

                        </form>


                        {/* JOB LIST HEADER */}

                        <div className="jobs-list-header">

                            <div>

                                <span className="jobs-list-label">
                                    AVAILABLE POSITIONS
                                </span>

                                <h2>
                                    Latest Job Opportunities
                                </h2>

                            </div>

                            <span className="job-count">
                                {totalJobs} job
                                {totalJobs !== 1 ? "s" : ""} available
                            </span>

                        </div>


                        {/* JOB GRID */}

                        <div className="job-grid">

                            {jobs.length === 0 ? (

                                <div className="no-jobs">

                                    <div className="no-jobs-icon">
                                        🔍
                                    </div>

                                    <h3>
                                        No jobs found
                                    </h3>

                                    <p>
                                        Try searching with a different title,
                                        location or skill.
                                    </p>

                                    {search && (
                                        <button onClick={clearSearch}>
                                            View All Jobs
                                        </button>
                                    )}

                                </div>

                            ) : (

                                jobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                    />
                                ))

                            )}

                        </div>


                        {/* PAGINATION */}

                        {totalPages > 1 && (

                            <div className="jobs-pagination">

                                <button
                                    disabled={page === 0}
                                    onClick={handlePrevious}
                                >
                                    ← Previous
                                </button>

                                <span className="page-number">
                                    Page <strong>{page + 1}</strong> of{" "}
                                    <strong>{totalPages}</strong>
                                </span>

                                <button
                                    disabled={page === totalPages - 1}
                                    onClick={handleNext}
                                >
                                    Next →
                                </button>

                            </div>

                        )}

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Jobs;

