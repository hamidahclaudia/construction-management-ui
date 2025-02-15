export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    id: number,
    email: string;
    username: string;
    token: string;
  }
  