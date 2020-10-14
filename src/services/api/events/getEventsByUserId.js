import axios from 'axios'
import { getToken } from "../../utils/getToken";

export function getEventsByUserId(userId) {
    return axios.get(
        `http://localhost:1337/me/events/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}