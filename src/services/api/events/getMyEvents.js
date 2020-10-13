import axios from 'axios'
import { getToken } from "../../utils/getToken";

export function getMyEvents(userId) {
    return axios.get(`http://localhost:1337/event/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}