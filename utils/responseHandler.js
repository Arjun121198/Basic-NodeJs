// utils/responseHandler.js

// Helper function for handling not found resources
exports.handleNotFound = (res, entity, message = 'Resource not found') => {
    if (!entity) {
      return res.status(404).json({ message });
    }
  };
  
  // Helper function for handling errors
  exports.handleError = (res, error, statusCode = 400) => {
    return res.status(statusCode).json({ error: error.message });
  };
  