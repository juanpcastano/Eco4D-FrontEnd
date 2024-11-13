import axios from "axios";

const Eco4DApi = axios.create({
  baseURL: "http://eco4dbackend-production.up.railway.app",
  withCredentials: true 
});

export default Eco4DApi;
