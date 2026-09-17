// This is the "grandchild" in the prop-drilling demo:
// Projects (page, owns the data) -> ProjectCard (child, receives a project object)
// -> TechStack (grandchild, receives just the techs array ProjectCard pulled out of it).
export default function TechStack({ techs }) {
  return (
    <ul className="tech-stack" aria-label="Technologies used">
      {techs.map((tech) => (
        <li key={tech} className="tech-pill">
          {tech}
        </li>
      ))}
    </ul>
  );
}
