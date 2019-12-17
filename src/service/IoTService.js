import axios from 'axios'

const USER_BASE_URL = `http://localhost:8080/user`;


export function setUserHealth(id, health) {
    return axios.post(`${USER_BASE_URL}/health/${id}`, health).then(res => res.data);
}
