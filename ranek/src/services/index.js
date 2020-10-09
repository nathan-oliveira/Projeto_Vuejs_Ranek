import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
})

axiosInstance.interceptors.request.use(
  function (config) {
    const token = window.localStorage.token;
    if (token) {
      config.headers.Authorization = token
    }

    return config;
  },
  function (error) {
    return Promise.reject(error)
  }
)

export const api = {
  get(endpoint) {
    return axiosInstance.get(endpoint)
  },
  post(endpoint, body) {
    return axiosInstance.post(endpoint, body)
  },
  delete(endpoint) {
    return axiosInstance.delete(endpoint)
  },
  put(endpoint, body) {
    return axiosInstance.put(endpoint, body)
  },
  login(body) {
    return axios.post('http://localhost:3000/usuario', body);
  },
  validateToken() {
    return axiosInstance.post('http://localhost:3000/usuario');
  }
}

export function getCep(cep) {
  return axios.get(`https://viacep.com.br/ws/${cep}/json/`);
}