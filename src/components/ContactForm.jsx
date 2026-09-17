import { useState } from "react";
import { API_BASE_URL } from "../config/api";
import "./ContactForm.css";

const initialValues = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Name is required.";
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.message.trim()) errors.message = "Message is required.";
  return errors;
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState(null);
  const [serverFieldErrors, setServerFieldErrors] = useState({});

  const errors = validate(values);
  const hasClientErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    setServerError(null);
    setServerFieldErrors({});

    if (hasClientErrors) return;

    setStatus("submitting");

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok) {
        // F4: bypassing client validation should still surface the server's message
        setServerError(data.error || "Something went wrong. Please try again.");
        setServerFieldErrors(data.fields || {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setValues(initialValues);
      setTouched({});
    } catch (err) {
      setServerError(
        "Couldn't reach the server. Please make sure the backend is running and try again."
      );
      setStatus("error");
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.name && !!errors.name}
        />
        {touched.name && errors.name && <p className="field-error">{errors.name}</p>}
        {serverFieldErrors.name && <p className="field-error">{serverFieldErrors.name}</p>}
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && <p className="field-error">{errors.email}</p>}
        {serverFieldErrors.email && <p className="field-error">{serverFieldErrors.email}</p>}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={touched.message && !!errors.message}
        />
        {touched.message && errors.message && <p className="field-error">{errors.message}</p>}
        {serverFieldErrors.message && <p className="field-error">{serverFieldErrors.message}</p>}
      </div>

      <button className="btn" type="submit" disabled={hasClientErrors || status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>

      {status === "success" && (
        <p className="form-success" role="status">
          Thanks! Your message has been sent.
        </p>
      )}
      {status === "error" && serverError && (
        <p className="form-error" role="alert">
          {serverError}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
