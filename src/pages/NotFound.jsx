import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="notfound-section">
      <p className="eyebrow">404</p>
      <h1>This page wandered off.</h1>
      <p>The route you're looking for doesn't exist.</p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </section>
  );
}
