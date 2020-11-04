import axios from 'axios'
import { config } from '../config'

let baseUrl = 'https://chatium.com'

export function setApiLocalBaseUrl() {
  baseUrl = 'https://local.chatium.io'
}

const instance = axios.create()

instance.interceptors.request.use(
  function(data) {
    data.headers['accept'] = 'application/json, text/plain, */*, application/chatium.v1+json'
    data.headers['content-type'] = 'application/json;charset=UTF-8'
    data.headers['user-agent'] = 'Chatium CLI tool'
    data.headers['x-chatium-unique-id'] = config.uid
    data.headers['x-chatium-unique-id'] = 'cli'
    data.headers['x-chatium-unique-id'] = '1.0.0'

    if (config.token) {
      data.headers['Authorization'] = 'Bearer ' + config.token
    }

    data.baseURL = baseUrl

    return data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const api = {

  async get(url: string) {
    const response = await instance.get(url)
    return response.data
  },

  async post(url: string, payload: {}) {
    const response = await instance.post(url, payload)
    return response.data
  },

}
