import axios from "axios";

const clientApi = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  baseURL: "https://english-app-node-js.vercel.app/api/v1",
});

export default clientApi;
