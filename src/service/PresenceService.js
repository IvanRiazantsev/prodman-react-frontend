import axios from 'axios'

const BASE_OFFICES_URL = `https://prodman-frontend.herokuapp.com/presence`;

export function getPresenceForWeek(id) {
    return axios.get(`${BASE_OFFICES_URL}/${id}/day`).then(res => res.data);
}
