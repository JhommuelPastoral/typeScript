import axios from "axios";
//https://typescript-6pyj.onrender.com/api
const axiosInstance = axios.create({
  baseURL: "https://typescript-6pyj.onrender.com/api",
  withCredentials: true
});

export default axiosInstance;