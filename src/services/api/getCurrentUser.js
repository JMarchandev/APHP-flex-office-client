import axios from 'axios'
import {getToken} from "../utils/getToken";

export async function getCurrentUser() {

  return axios.get(
    'http://localhost:1337/users/me', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  )
}