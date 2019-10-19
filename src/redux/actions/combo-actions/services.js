import Axios from "axios";

export const getComboFromAPI = (params) => Axios.get('https://nbk9t.sse.codesandbox.io/combos', { params: params }).then(res => {
    console.log(res)
    return res.data
})
