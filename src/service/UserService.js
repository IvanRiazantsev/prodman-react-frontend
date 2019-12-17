import axios from 'axios'

const USER_BASE_URL = `http://localhost:8080/user`;

export function getUser(id) {
    return axios.get(`${USER_BASE_URL}/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('jwtToken')
        }
    }).then(res => res.data);
}

export function getUserHealth(id) {
    return axios.get(`${USER_BASE_URL}/health/${id}`).then(res => res.data);
}
