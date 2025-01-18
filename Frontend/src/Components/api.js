import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const submitData = (data) => {
    return axios.post(`${API_URL}/submit`, data);
};

export const fetchData = () => {
    return axios.get(`${API_URL}/data`);
};
