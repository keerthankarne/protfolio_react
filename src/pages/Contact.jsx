import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-section">
      <div className="container contact-inner">
        <Reveal className="contact-info">
          <p className="eyebrow">Get in touch</p>
          <h1>Contact Me</h1>
          <p className="contact-lead">
            Interested in working together? Fill out the form or reach me
            directly below.
          </p>
          <p>
            <strong>Primary Email:</strong>{" "}
            <a href="mailto:keerthankarne33@gmail.com">
              keerthankarne33@gmail.com
            </a>
          </p>
          <p>
            <strong>Student Email:</strong>{" "}
            <a href="mailto:kk24csb0a33@student.nitw.ac.in">
              kk24csb0a33@student.nitw.ac.in
            </a>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <a href="tel:+919100625095">+91-9100625095</a>
          </p>
          <p>
            <strong>Roll No:</strong> 24CSB0A33
          </p>
          <p>
            <strong>Location:</strong> NIT Warangal, Telangana, India
          </p>
          <div className="social-links">
            <a href="https://github.com/KarneKeerthan" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              LinkedIn Profile
            </a>
          </div>
        </Reveal>

        <Reveal delay={120} className="contact-form-wrap">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
