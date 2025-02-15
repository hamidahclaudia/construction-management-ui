import axios from "axios";
import type { LoginRequest, LoginResponse } from "../types/AuthTypes";

const API_URL = "http://localhost:5001/api"; // Replace with your API URL

const authService = {
    async loginUser(credentials: LoginRequest): Promise<LoginResponse> {
      try {
        const { data } = await axios.post<LoginResponse>(`${API_URL}/auth/login`, credentials);
        return data;
      } catch (error: any) {
        throw new Error(error.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };
  
  export default authService;
