import axios from "axios";
import { API_URL } from "../settings";

const api = axios.create({
  baseURL: API_URL, // URL do seu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
