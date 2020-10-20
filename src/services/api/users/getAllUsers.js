import axios from 'axios'
import {getToken} from "../../utils/getToken";

export function getAllUsers() {

    return axios.get(
        'http://localhost:1337/users', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
}