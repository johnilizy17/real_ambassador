import axios from "axios";
let baseURL = "http://127.0.0.1:8787/v1/";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Authorization"] = `Bearer `;

const authInstance = axios.create({
  baseURL
});


export default authInstance