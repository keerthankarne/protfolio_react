// Basic, dependency-free email check — good enough to satisfy "missing @" style validation.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates a contact form payload.
 * Returns an object shaped like { field: "error message" } for every invalid field.
 * An empty object means the payload is valid.
 */
export function validateContact(body = {}) {
  const errors = {};
  const { name, email, message } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.name = "Name is required.";
  }

  if (!email || typeof email !== "string" || !email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email.trim())) {
    errors.email = "Email format is invalid.";
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    errors.message = "Message is required.";
  }

  return errors;
}
