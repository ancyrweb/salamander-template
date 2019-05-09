import StandardError from "./StandardError";

export const successResponse = (data = {}, message = "", code = "OK") => ({
  success: true,
  message,
  code,
  ...data
});

export const errorResponse = (
  message: string | StandardError = "",
  code: string = "ERROR",
  data = {}
) => ({
  success: false,
  message: typeof message === "string" ? message : message.message,
  code: typeof message !== "string" ? message.code : code,
  ...data
});

export default {
  success: successResponse,
  error: errorResponse
};
