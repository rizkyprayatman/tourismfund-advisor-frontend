import Api from "../utils/Api";

class MasterUnitServices {
  static async getAllUnits(data) {
    const response = await Api.get(
      `/units/all?page=${data.page}&perPage=${data.perPage}&sort=${data.sort}&order=${data.order}&search=${data.search}`
    );
    console.log(response);
    return response;
  }

  static async addUnit(formData) {
    const response = await Api.post(`/units`, formData);

    return response;
  }

  static async updateUnit(formData) {
    const response = await Api.put(`/units/${formData.id}`, formData);

    return response;
  }

  static async deleteUnit(formData) {
    const response = await Api.delete(`/units/${formData.id}`);

    return response;
  }
}

export default MasterUnitServices;
