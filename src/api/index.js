import axios from "axios";

const apiURL = process.env.REACT_APP_API_URL;

export let api = axios.create({
  baseURL: apiURL,
});
