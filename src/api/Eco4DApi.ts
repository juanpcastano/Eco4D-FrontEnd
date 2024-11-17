import axios from "axios";
import { heartbeat } from "../services/apiHeartbeatService";

const backendUrl = await heartbeat();
const Eco4DApi = axios.create({
  baseURL: backendUrl,
  withCredentials: true 
});

export default Eco4DApi;
