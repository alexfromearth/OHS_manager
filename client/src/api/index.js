import * as axios from 'axios';

class backAPI {
  async isUserAuthenticated() {
    const response = await axios.get('/api/auth/me');
    return { ...response.data, status: response.status };
  }

  async registration(fieldsData) {
    const response = await axios.post('/api/auth/registration', fieldsData);
    return { ...response.data, status: response.status };
  }

  async login(fieldsData) {
    const response = await axios.post('/api/auth/login', fieldsData);
    return { ...response.data, status: response.status };
  }

  async addWorker(companyId, generalInfo, profInfo) {
    const response = await axios.post(`/api/workers/${companyId}/worker`, {
      generalInfo,
      profInfo
    });
    return { ...response.data, status: response.status };
  }

  async logout() {
    const response = await axios.delete('/api/auth/login');
    return { ...response.data, status: response.status };
  }

  async allEmployees(id) {
    const response = await axios.get(`/api/workers/${id}/list`);
    return { ...response.data, status: response.status };
  }

  async eachWorker(companyId, workerId) {
    const response = await axios.get(`/api/workers/${companyId}/worker/${workerId}`);
    return { ...response.data, status: response.status };
  }

  // uploadScans
  async uploadScans(formData, companyId, workerId) {
    const response = await axios.put(`/api/workers/${companyId}/worker/${workerId}`, formData);
    return {...response.data, status: response.status};
  }

  async deleteWorker(companyId, workerId) {
    const response = await axios.delete(`/api/workers/${companyId}/worker/${workerId}`);
    return {...response.data, status: response.status };
  }

  async updateSgnedList( workerId, signedOhsIds ) {
    const response = await axios.patch(`/api/documents/${workerId}/ohsList`, {signedOhsIds});
    return {...response.data, status: response.status};
  }
}

export default backAPI;
