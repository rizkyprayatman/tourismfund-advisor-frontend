import Api from "../utils/Api";

class AuthServices {
  static async login(data) {
    const response = await Api.post("/admin/login", data);
    console.log(response);
    localStorage.setItem("token", response.data.token);
    return response;
  }
}

export default AuthServices;
