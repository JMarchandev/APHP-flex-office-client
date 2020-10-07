import axios from 'axios'
import {getToken} from "../utils/getToken";

export async function getCurrentUser() {

  return axios.get(
    'http://localhost:1337/users/me', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  ).then(result => {
    return ({
      user: result.data,
      isLoading: false,
      error: false
    })
  }).catch(error => {
    return ({
      error: `${error}`,
      isLoading: false
    });
  })
}