import Axios from "axios";

export const getDataFromAPI = (url) => (
    Axios({
        method: 'GET',
        url: url,
        responseType: 'json'
    })
        .then(res => {
            return res.data
        })
)