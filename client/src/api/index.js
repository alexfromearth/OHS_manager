import * as axios from 'axios';

class backAPI{
    async isUserAuthenticated() {
        const response = await axios.get('/api/auth/me');
        return {...response.data, status: response.status};
    }

    async registration(fieldsData) {
        const response = await axios.post('/api/auth/registration', fieldsData);
        return {...response.data, status: response.status};
    }

    async login(fieldsData) {
        const response = await axios.post('/api/auth/login', fieldsData);
       return {...response.data, status: response.status};
    }

    async logout() {
        const response = await axios.delete('/api/auth/login');
        return {...response.data, status: response.status};
    }
}

export default backAPI;
