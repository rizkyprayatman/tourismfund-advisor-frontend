import Api from "../utils/Api";

class FormPermohonanService {
  static async sendFormPermohonan(formData) {
    const response = await Api.post(`/visits/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }

}

export default FormPermohonanService;
