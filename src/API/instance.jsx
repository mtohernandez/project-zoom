import axios from "axios";

export const instance = axios.create({
  baseURL: "https://project-api-zoom.onrender.com"
});