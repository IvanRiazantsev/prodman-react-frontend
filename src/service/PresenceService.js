import axios from 'axios'

const BASE_OFFICES_URL = `http://localhost:8080/presence`;

export function getPresenceForWeek(id) {
    return axios.get(`${BASE_OFFICES_URL}/${id}/day`).then(res => res.data);
}