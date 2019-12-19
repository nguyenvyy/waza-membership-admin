import Axios from 'axios';
import { serverURL } from '../../../constant';

/**
 *  call login API
 * @param {object} user
 * @param {string} user.username
 * @param {string} user.password 
 */
export const loginAPI =  (user) => {
    return Axios({
        method: 'POST',
        url: `${serverURL}/admins/login`,
        responseType: 'json',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        timeout: 30000,
        data: user
    })
        .then((res) => res.data)
        .catch((_) => 400);
};