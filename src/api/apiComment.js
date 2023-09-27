import { api, getResponseData, escalateError } from "./index";

export default class apiComment {
  static async saveComment(loginComment) {
    try {
      const currentDate = new Date();

      loginComment.date = currentDate.toLocaleDateString("en-US"); // Esto formateará la fecha como "mm/dd/yyyy" en inglés, puedes ajustar 'en-US' según tu preferencia de idioma.

      const response = await api.post("comments", loginComment, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return getResponseData(response);
    } catch (error) {
      escalateError(error);
    }
  }

  static async getComments() {
    return await api.get("comments").then(getResponseData).catch(escalateError);
  }
}
