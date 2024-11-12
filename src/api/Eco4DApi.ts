import axios from "axios";

const Eco4DApi = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true 
});

export default Eco4DApi;
