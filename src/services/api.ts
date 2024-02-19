import axios from "axios";

const baseUrl = process.env.BASE_URL;

const api = axios.create({
  baseURL: baseUrl,
});

export default api;
