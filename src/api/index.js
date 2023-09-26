import axios from "axios";

const apiURL = "http://localhost:3000/";

export let api = axios.create({
  baseURL: apiURL,
});

export const getResponseData = (resp) => resp.data;

export const escalateError = (err) => {
  let errorFromResponse;
  let errorFromResponseScheduler;
  try {
    errorFromResponse = err.response.data.error;
    errorFromResponseScheduler = err.response.data.message;
  } catch (e) {
    errorFromResponse = undefined;
  }
  const finalValidation =
    typeof err === "string" ? err : err.toString() || "Error Inesperado";
  const newErr = new Error(
    errorFromResponse ||
      errorFromResponseScheduler ||
      (err instanceof Error ? err.message || err.toString() : finalValidation)
  );
  try {
    newErr.data = err.response.data;
  } catch (e) {}
  throw newErr;
};
