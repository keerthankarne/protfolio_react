import mistBg from "../assets/hero-mist.jpeg";
import Reveal from "../components/Reveal";
import "./About.css";

export default function About() {
  return (
    <section
      className="about-section"
      style={{ backgroundImage: `url(${mistBg})` }}
    >
      <div className="about-container">
        <Reveal as="div" className="about-card">
          <p className="eyebrow">About Me</p>
          <h1>Karne Keerthan</h1>
          <p className="about-subtitle-text">
            B.Tech in Computer Science and Engineering (CSE) · NIT Warangal
          </p>
          <p>
            I am a Computer Science undergraduate at the National Institute of Technology, Warangal (NIT Warangal) with a strong foundation in full-stack web development, data structures, and algorithm design.
          </p>
          <p>
            I specialize in engineering robust MERN stack applications, designing PostgreSQL databases, and developing clean RESTful APIs. I'm passionate about solving complex computational problems and building real-world digital tools—such as automated healthcare queueing systems and smart graph-based debt settlement algorithms.
          </p>
        </Reveal>

        <div className="about-two-col">
          <Reveal as="div" className="about-card col-card" delay={200}>
            <p className="eyebrow">Milestones</p>
            <h2>Achievements</h2>
            <div className="achievement-box">
              <span className="achievement-badge">Ongoing</span>
              <h3>Competitive Programming</h3>
              <p>
                Solved <strong>300+ DSA problems</strong> across LeetCode &amp; GeeksforGeeks, mastering fundamental data structures, graph traversal, greedy techniques, and dynamic programming.
              </p>
            </div>
          </Reveal>

          <Reveal as="div" className="about-card col-card" delay={300}>
            <p className="eyebrow">Academic Focus</p>
            <h2>Coursework &amp; Interests</h2>
            <div className="focus-group">
              <h4>Core Coursework</h4>
              <p>Data Structures &amp; Algorithms, Object-Oriented Programming (OOP), Database Management Systems (DBMS), Operating Systems (OS)</p>
            </div>
            <div className="focus-group">
              <h4>Areas of Interest</h4>
              <p>Software Development, Full Stack Web Development, Database Management, Operating Systems, Java</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


