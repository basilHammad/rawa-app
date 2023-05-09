import axios from "axios";

import { BASE_URL } from "@env";
import { getData } from "../utils";

const fetcher = axios.create({
  // baseURL: "http://rawa.alisuboh.com/",
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

fetcher.interceptors.request.use(
  async (config) => {
    const token = await getData("userToken");
    // console.log("token", token);
    config.headers.Authorization = `Bearer ${token} `;

    return config;
  },
  (error) => Promise.reject(error)
);

export default fetcher;
