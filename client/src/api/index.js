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

  async eachWorker(company_id, worker_id) {
    const response = await axios.get(`/api/workers/${company_id}/worker/${worker_id}`);
    return { ...response.data, status: response.status };
  }

}

export default backAPI;
