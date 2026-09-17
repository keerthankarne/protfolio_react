import "./Skills.css";

const SKILL_CATEGORIES = [
  {
    title: "Programming Languages",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "SQL"]
  },
  {
    title: "Frameworks & Databases",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "PostgreSQL"]
  },
  {
    title: "Core CS & Tools",
    skills: [
      "Data Structures & Algorithms",
      "DBMS",
      "Operating Systems",
      "Git & GitHub",
      "VS Code"
    ]
  }
];

export default function Skills() {
  const marqueeItems = Array(8).fill("SKILLS & TECH");

  return (
    <section className="skills-section" aria-labelledby="skills-heading">
      <div className="marquee-row" aria-hidden="true">
        <div className="marquee">
          {marqueeItems.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>

      <h2 id="skills-heading" className="sr-only">
        Technical Skills
      </h2>

      <div className="skills-clean-container">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title} className="skill-cat-card">
            <h3 className="cat-title">{cat.title}</h3>
            <div className="skill-pills-wrap">
              {cat.skills.map((skill) => (
                <span className="clean-skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="marquee-row marquee-row-reverse" aria-hidden="true">
        <div className="marquee marquee-reverse">
          {marqueeItems.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}


