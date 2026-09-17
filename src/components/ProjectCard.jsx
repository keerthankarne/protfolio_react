import { useState } from "react";
import { Link } from "react-router-dom";
import TechStack from "./TechStack";
import "./ProjectCard.css";

export default function ProjectCard({
  id,
  title,
  description,
  techStack,
  image,
  demoLink,
  codeLink,
}) {
  // Local, per-instance state — expanding one card never affects another.
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="project-card">
      <div className={`project-thumb thumb-${image}`} aria-hidden="true" />

      <div className="project-card-body">
        <h3>{title}</h3>
        <p className="project-desc">{description}</p>

        {/* techStack is drilled one level further down into TechStack */}
        <TechStack techs={techStack} />

        <button
          className="details-toggle"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
        >
          {expanded ? "Hide details ▲" : "View details ▼"}
        </button>

        {expanded && (
          <div className="project-links">
            <Link to={`/projects/${id}`} className="btn btn-outline">
              Full case study
            </Link>
            <a href={demoLink} className="btn">
              Live Demo
            </a>
            <a href={codeLink} className="btn btn-outline">
              GitHub
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
