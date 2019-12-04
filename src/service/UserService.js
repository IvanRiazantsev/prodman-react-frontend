import axios from 'axios'

const USER_BASE_URL = `https://prodman-app.herokuapp.com/user`;

export function getUser(id) {
    console.log(localStorage.getItem('jwtToken'))
    return axios.get(`${USER_BASE_URL}/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('jwtToken')
        }
    }).then(res => res.data);
}