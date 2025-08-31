// services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  // timeout, etc. se quiser
});
