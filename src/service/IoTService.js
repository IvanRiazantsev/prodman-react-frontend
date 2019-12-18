import axios from 'axios'

const USER_BASE_URL = `https://prodman-frontend.herokuapp.com/user`;


export function addUserHealth(id, health) {
    return axios.post(`${USER_BASE_URL}/health/${id}`, health).then(res => res.data);
}
export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
