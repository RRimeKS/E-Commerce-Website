const globalError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  sendError(error, res);
};

const sendError = (error, res) => {
  return res.status(404).json({
    status: error.status,
    statusCode: error.statusCode,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = globalError;
