import axios from "axios";
let baseURL = "https://farm.johnabrahamtosin.workers.dev/v1/";

axios.defaults.headers.common["Content-Type"] = "application/json";

axios.defaults.headers.common["Authorization"] = `Bearer `;

const authInstance = axios.create({
  baseURL
});


export default authInstance