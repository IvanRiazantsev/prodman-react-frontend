import axios from 'axios'

const BASE_OFFICES_URL = `https://prodman-frontend.herokuapp.com/office`;

export function getOffices() {
    return axios.get(BASE_OFFICES_URL).then(res => res.data);
}

export function deleteOffice(id) {
    return axios.delete(`${BASE_OFFICES_URL}/${id}`).then(res => res.data);
}

export function addOffice(office) {
    return axios.post(BASE_OFFICES_URL, office).then(res => res.data);
}
