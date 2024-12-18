import axios from 'axios'

const cityApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ANIMALS_URL,
  headers: {
    'x-api-key': process.env.SECRET_API_KEY
  }
})

export default cityApi;
