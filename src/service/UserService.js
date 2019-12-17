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

export function getUnselectedDiseases(id) {
    return axios.get(`${USER_BASE_URL}/health/${id}/diseases_absent`).then(res => res.data);
}

export function deleteDisease(id, disease) {
    return axios.delete(`${USER_BASE_URL}/health/${id}/${disease}`).then(res => res.data);
}


export function addDisease(id, disease) {
    return axios.put(`${USER_BASE_URL}/health/${id}/${disease}`).then(res => res.data);
}
