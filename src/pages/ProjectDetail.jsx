import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TechStack from "../components/TechStack";
import Reveal from "../components/Reveal";
import { API_BASE_URL } from "../config/api";
import "./ProjectDetail.css";

function ProjectDetail() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function fetchProject() {
      setIsLoading(true);
      setError(null);
      setNotFound(false);

      try {
        const res = await fetch(`${API_BASE_URL}/api/projects/${projectId}`);

        if (res.status === 404) {
          if (!ignore) setNotFound(true);
          return;
        }

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        if (!ignore) setProject(data);
      } catch (err) {
        if (!ignore) {
          setError(
            "We couldn't load this project right now. Please make sure the backend server is running and try again."
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchProject();

    return () => {
      ignore = true;
    };
  }, [projectId]);

  if (isLoading) {
    return (
      <section className="detail-section">
        <div className="container">
          <p className="status-message">Loading project…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="detail-section">
        <div className="container">
          <p className="status-message status-message--error" role="alert">
            {error}
          </p>
        </div>
      </section>
    );
  }

  if (notFound) {
    return (
      <section className="detail-missing">
        <div className="container">
          <p className="status-message" role="alert">
            Project not found.
          </p>
          <Link to="/projects">Back to all projects</Link>
        </div>
      </section>
    );
  }

  return (
    <Reveal>
      <section className="detail-section">
        <div className="container">
          <Link to="/projects" className="back-link">← Back to all projects</Link>
          <div className={`detail-thumb thumb-${project.image}`} aria-hidden="true" />
          <div className="detail-meta">
            <span className="detail-year">2026</span>
            <span className="detail-subtitle">Case Study</span>
          </div>
          <h1>{project.title}</h1>
          <p className="detail-lead">{project.longDescription || project.description}</p>
          
          {project.highlights && project.highlights.length > 0 && (
            <div className="detail-highlights-wrap">
              <h4>Key Highlights</h4>
              <ul className="detail-highlights">
                {project.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="detail-stack-wrap">
            <h4>Technologies Used</h4>
            <TechStack techs={project.techStack} />
          </div>
          
          <div className="detail-links">
            {project.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn">
                View project
              </a>
            )}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

export default ProjectDetail;
