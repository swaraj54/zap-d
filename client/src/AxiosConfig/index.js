import axios from "axios";

var BackendUrl = "https://dzap-backend-server.onrender.com/api/v1"
if (process.env.MODE === "PRODUCTION") {
    BackendUrl = "https://dzap-backend-server.onrender.com/api/v1"
}

const api = axios.create({ baseURL: BackendUrl })

export default api;