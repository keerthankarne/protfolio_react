import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "../assets/dream-landscape.jpg";
import smoke from "../assets/smoke-red.jpeg";
import "./Home.css";

const PARTICLES = [
  { left: "8%", top: "22%", size: 5, delay: "0s", duration: "9s" },
  { left: "18%", top: "62%", size: 3, delay: "1.4s", duration: "11s" },
  { left: "32%", top: "12%", size: 4, delay: "0.6s", duration: "8s" },
  { left: "52%", top: "78%", size: 3, delay: "2.1s", duration: "10s" },
  { left: "68%", top: "30%", size: 6, delay: "0.3s", duration: "12s" },
  { left: "78%", top: "68%", size: 4, delay: "1.8s", duration: "9s" },
  { left: "90%", top: "20%", size: 3, delay: "0.9s", duration: "10.5s" },
  { left: "44%", top: "48%", size: 5, delay: "2.6s", duration: "13s" },
];

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate a brief loading sequence on mount only (empty dependency array).
  // Cleanup clears the timer if the component unmounts before it fires.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="home-loading" role="status" aria-live="polite">
        <div className="loading-mark">KK</div>
        <span>Loading portfolio…</span>
      </div>
    );
  }

  return (
    <section
      className="home-hero"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div
        className="hero-smoke"
        style={{ backgroundImage: `url(${smoke})` }}
        aria-hidden="true"
      />
      <div className="hero-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      <div className="home-hero-overlay">
        <p className="eyebrow">Computer Science &amp; Engineering · NIT Warangal</p>
        <h1 className="home-title">
          KEER<span className="accent-text">THAN</span>
          <br />
          <span className="accent-text">KAR</span>NE
        </h1>
        <p className="home-subtitle">
          B.Tech CSE Student at NIT Warangal &amp; Full Stack Developer passionate about building high-impact web applications, real-time systems, and efficient algorithms.
        </p>

        <div className="home-cta">
          <Link to="/projects" className="btn">
            View Projects
          </Link>
          <Link to="/about" className="btn btn-outline">
            About Me
          </Link>
          <Link to="/contact" className="btn btn-outline">
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}

