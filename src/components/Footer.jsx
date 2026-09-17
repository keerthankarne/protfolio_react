import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-mark">KK</span>
        <p>
          Designed &amp; built by Karne Keerthan · NIT Warangal — © {new Date().getFullYear()}
        </p>
        <div className="footer-links">
          <a href="https://github.com/KarneKeerthan" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
