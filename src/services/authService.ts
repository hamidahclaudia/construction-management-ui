import apiClient from "./apiClient"; 
import type { LoginRequest, LoginResponse } from "../types/AuthTypes";

const authService = {
  async loginUser(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await apiClient.post<LoginResponse>("/auth/login", credentials);

      localStorage.setItem("token", data.token);
      localStorage.setItem("id", data.id.toString());
      return data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Login failed. Please try again.");
    }
  }
};

export default authService;
