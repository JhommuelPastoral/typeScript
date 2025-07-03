import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://typescript-6pyj.onrender.com/api",
  withCredentials: true
});

export default axiosInstance;