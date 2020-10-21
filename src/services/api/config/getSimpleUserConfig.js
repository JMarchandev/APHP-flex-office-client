import axios from 'axios'
import {getToken} from "../../utils/getToken";

export const getDayBeforeBooking = () => {
    return axios.get('http://localhost:1337/configs?userRole=simpleUser&_limit=1',{
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}