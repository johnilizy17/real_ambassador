import axios from "axios";
let baseURL = "https://queues.aigngapp.workers.dev/";
let token;

if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem("token");
}
axios.defaults.headers.common["Content-Type"] = "application/json";

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const instanceNotication = axios.create({
  baseURL,
});

export default instanceNotication;