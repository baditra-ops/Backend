// services/api.js

import axios from "axios"

const api = axios.create({
    baseURL: "https://videotube-backend-1wpd.onrender.com/api/v1",
    withCredentials: true
})

export default api