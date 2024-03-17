import _axios from 'axios'

const BASE_URL = 'https://kuasar-backend-tvgmxwhmma-as.a.run.app'

export const axios = _axios.create({
  baseURL: BASE_URL,
})

export const axiosPrivate = _axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
