import axios from "axios";

const Eco4DApi = axios.create({
  baseURL: "https://eco4dbackend-production.up.railway.app",
  withCredentials: true 
});

export default Eco4DApi;
