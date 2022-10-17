import axios from 'axios';


export const getRandomUsersList = (params) => {

    axios.get(`https://randomuser.me/api/?results=50`)
        .then((response) => {
            if (response && response.status === 200) {
                return Promise.resolve(response.data)
            }
        }).catch((error) => {
            return Promise.reject(error)
    })
}