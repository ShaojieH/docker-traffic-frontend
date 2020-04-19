import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://127.0.0.1:5000/api/'
})

export default service
