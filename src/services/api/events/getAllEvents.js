import axios from 'axios'
import {getToken} from "../../utils/getToken";

export function getAllEvents() {

    return axios.get(
        'http://localhost:1337/events', {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    )
}