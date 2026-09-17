// Catch-all for any route that doesn't match one defined above it.
// Must be registered AFTER all real routes.
export function notFoundHandler(req, res, next) {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
}

// Global error handler. Express recognizes this as an error handler because it
// takes four arguments — always keep `next` even though it's unused.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error(err.stack || err);

  // If a route (e.g. malformed JSON body) already set a status, keep it; else 500.
  const status = err.status || (err.type === "entity.parse.failed" ? 400 : 500);
  const message =
    err.type === "entity.parse.failed"
      ? "Malformed JSON in request body."
      : err.message || "Something went wrong on the server.";

  res.status(status).json({ error: message });
}
