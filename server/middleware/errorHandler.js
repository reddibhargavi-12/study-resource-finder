export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err.message);

  // NFR 9.2: Under no circumstances shall API keys, stack traces, or raw backend errors be shown to the user
  res.status(statusCode).json({
    success: false,
    error: err.message && statusCode < 500 ? err.message : "We couldn't generate resources right now. Please try again.",
    message: err.message && statusCode < 500 ? err.message : "We couldn't generate resources right now. Please try again."
  });
};
