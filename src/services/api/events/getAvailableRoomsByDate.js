import axios from 'axios'
import { getToken } from "../../utils/getToken";

export function getAvailableRoomsByDate(dateFormat, userId) {
    return axios.get(`http://localhost:1337/event/${dateFormat}/${userId}`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}