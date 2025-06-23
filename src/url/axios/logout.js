import axios from "axios";
let baseURL = "https://farm.johnabrahamtosin.workers.dev/v1/";

const authLogout = () => fetch(`${baseURL}auth/logout`, {
  method: 'POST',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',       // Common for AJAX requests
    'Content-Type': 'application/json',
    // Include any other headers required by your logout endpoint
  },
  credentials: 'include' // Include cookies with the request
})
  .then(response => {
    if (response.ok) {
      return true
    } else {
      console.error('Logout failed:', response.statusText);
    }
  })

export default authLogout;