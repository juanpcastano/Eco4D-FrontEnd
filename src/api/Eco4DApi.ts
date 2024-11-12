import axios from "axios";
import store from "../Redux/store";

const Eco4DApi = axios.create({
  baseURL: "http://localhost:3000",
});

Eco4DApi.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.token; 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

export default Eco4DApi;
