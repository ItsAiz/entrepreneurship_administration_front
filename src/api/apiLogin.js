import { api, getResponseData, escalateError } from "./index";

export default class apiLogin {
  static async login(loginData) {
    try {
      //const hashedPassword = await bcrypt.hash(loginData.password, 10);
      //loginData.password = hashedPassword;
      const response = await api.post("users/login", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return getResponseData(response);
    } catch (error) {
      escalateError(error);
    }
  }

  static async userRegister(userRegister) {
    try {
      //const hashedPassword = await bcrypt.hash(userRegister.password, 10);
      //userRegister.password = hashedPassword;
      userRegister.rol = "Estudiante";
      const response = await api.post("users", userRegister, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return getResponseData(response);
    } catch (error) {
      escalateError(error);
    }
  }
}
