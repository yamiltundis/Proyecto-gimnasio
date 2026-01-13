import { Usuario } from '@prisma/client';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    user: Omit<Usuario, 'password'>;
    token: string;
  };
}