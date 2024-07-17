import Api from "../utils/Api";

class PermohonanServices {
  static async getAllPermohonan(data) {
    const response = await Api.get(
      `/visits/all?page=${data.page}&perPage=${data.perPage}&sort=${data.sort}&order=${data.order}&search=${data.search}`
    );
    console.log(response);
    return response;
  }

  static async getAllUnits() {
    const response = await Api.get(`/units`);
    console.log(response);
    return response;
  }

  static async setujuiPermohonan(formData) {
    const response = await Api.put(`/visits/${formData.id}`, formData);

    return response;
  }

  static async tolakPermohonan(formData) {
    const response = await Api.put(`/visits/reject/${formData.id}`, formData);

    return response;
  }

  static async selesaiPermohonan(formData) {
    const response = await Api.put(`/visits/finish/${formData.id}`);

    return response;
  }
}

export default PermohonanServices;
