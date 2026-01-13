import prisma from '../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LoginRequest, LoginResponse } from '../types/auth.types';

export async function login(data: LoginRequest): Promise<LoginResponse['data']> {
   // 1. Buscar usuario
   const usuario = await prisma.usuario.findUnique({
       where: { email: data.email }
   });
   if (!usuario) {
       const error = new Error('Credenciales inválidas') as any;
       error.statusCode = 401;
       throw error;
   }
   // 2. Verificar password
   const validPassword = await bcrypt.compare(data.password, usuario.password);
   if (!validPassword) {
       const error = new Error('Credenciales inválidas') as any;
       error.statusCode = 401;
       throw error;
   }
   // 3. Generar JWT
    const secret: string = process.env.JWT_SECRET as string;

   const token = jwt.sign(
       {
           id: usuario.id,
           email: usuario.email,
           rol: usuario.rol
       },
       secret,
       { expiresIn: "1h"}
   );

   const { password: _, ...userWithoutPassword } = usuario;
   return {
       user: userWithoutPassword,
       token
   };
}