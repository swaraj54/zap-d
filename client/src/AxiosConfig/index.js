import axios from "axios";

var BackendUrl = "https://dzap-backend-server.onrender.com/"
if (process.env.MODE === "PRODUCTION") {
    BackendUrl = "https://dzap-backend-server.onrender.com/"
}

const api = axios.create({ baseURL: BackendUrl })

export default api;