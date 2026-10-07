import { Link } from "react-router-dom";

function JobCard({ job }) {
    return (
        <div className="job-card">

            <div className="job-card-header">

                <div>
                    <h3>{job.title}</h3>

                    <p className="job-company">
                        {job.recruiter?.company || "Company"}
                    </p>
                </div>

            </div>

            <div className="job-meta">

                <span>
                    📍 {job.location}
                </span>

                <span>
                    💰 ₹{job.salary}
                </span>

                <span>
                    💼 {job.jobType}
                </span>

            </div>

            <div className="job-skills">

                {job.skills &&
                    job.skills.split(",").map((skill, index) => (
                        <span key={index}>
                            {skill.trim()}
                        </span>
                    ))
                }

            </div>

            <div className="job-card-footer">

                <Link to={`/jobs/${job.id}`}>
                    View Details →
                </Link>

            </div>

        </div>
    );
}

export default JobCard;