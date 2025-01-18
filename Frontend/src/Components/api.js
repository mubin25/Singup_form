import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const submitData = (data) => {
    return axios.post(`${API_URL}/submit`, data);
};

export const fetchData = () => {
    return axios.get(`${API_URL}/data`);
};

export const updateData = (id, updatedData) => {
    return axios.put(`${API_URL}/api/data/${id}`, updatedData);
};

export const deleteData = (id) => {
    return axios.delete(`${API_URL}/api/data/${id}`);
};