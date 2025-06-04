import axios from "axios";
let baseURL = "http://127.0.0.1:8787/api/v1/";
let token;

/* if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem("token");
} */
axios.defaults.headers.common["Content-Type"] = "application/json";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const instance = axios.create({
  baseURL,
});

export default instance;