import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";
import { API_BASE_URL } from "../config/api";
import "./Projects.css";

// NOTE: the static `import { projects } from "../data/projects"` is gone —
// per F1, the Projects page now renders only data returned by the API.

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // new state, dedicated to this fetch (F1)
  const [error, setError] = useState(null); // F2

  useEffect(() => {
    let ignore = false; // guards against setting state after unmount

    async function fetchProjects() {
      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`${API_BASE_URL}/api/projects`);

        if (!res.ok) {
          throw new Error(`Server responded with ${res.status}`);
        }

        const data = await res.json();
        if (!ignore) setProjects(data);
      } catch (err) {
        if (!ignore) {
          setError(
            "We couldn't load projects right now. Please make sure the backend server is running and try again."
          );
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    fetchProjects();

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return (
      <section className="projects-section">
        <div className="container">
          <p className="status-message">Loading projects…</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects-section">
        <div className="container">
          <p className="status-message status-message--error" role="alert">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="container">
        <h1>Projects</h1>
        <p className="projects-intro">
          Here are some of the projects I've worked on.
        </p>
        <div className="projects-grid">
          {projects.map((project) => (
            <Reveal key={project.id}>
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
