import axios from 'axios'
import {getToken} from "../../utils/getToken";

export function getRooms() {

  return axios.get(
    'http://localhost:1337/rooms', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}