import stoneTexture from "../assets/stone-texture.jpg";
import Skills from "../components/Skills";
import Reveal from "../components/Reveal";
import "./SkillsPage.css";

export default function SkillsPage() {
  return (
    <section
      className="skills-page"
      style={{ backgroundImage: `url(${stoneTexture})` }}
    >
      <div className="skills-page-overlay">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Technical Expertise</p>
            <h1>Skills &amp; Interests</h1>
            <p className="skills-page-lead">
              The programming languages, web frameworks, databases, developer tools, and core CS fundamentals powering my full-stack engineering work.
            </p>
          </Reveal>
        </div>
      </div>
      <Reveal delay={100}>
        <Skills />
      </Reveal>
    </section>
  );
}
