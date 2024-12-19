import axios from 'axios'

const cityApiPrivate = axios.create({
  baseURL: process.env.PRIVATE_ANIMALS_URL,
  headers: {
    'x-api-key': process.env.SECRET_API_KEY
  }
})

export default cityApiPrivate;
