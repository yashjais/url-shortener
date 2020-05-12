import Axios from 'axios'

const axios = Axios.create({
    // baseURL: 'http://localhost:3010' // for dev
    baseURL: '/' // for production
})

export default axios