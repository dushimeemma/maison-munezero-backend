const asyncHandler = (func) => {
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      res.status(500).json({
        errors: [{ error: error.message }],
      });
    }
  };
};

export default asyncHandler;
