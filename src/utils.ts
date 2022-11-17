export const sendSuccessResponse = (data) => ({ data });

export const sendErrorResponse = (errorCode, message) => ({
  errorCode,
  message,
});
