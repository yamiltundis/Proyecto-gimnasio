import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest } from '../types/usuario.types'

let usuarios : Usuario[] = [
    { id: 1, nombre: 'Yamil', apellido: 'Tundis', dni: 45910179, fechaNacimiento: new Date(2004, 7, 10), 
        email: 'yamiltundis6@gmail.com', foto: 'foto', rol: 'cliente'},
    { id: 2, nombre: 'Pri', apellido: 'Paroni', dni: 47401190, fechaNacimiento: new Date(2006, 6, 3), 
        email: 'prichu@gmail.com', foto: 'fotopri', rol: 'cliente'}
]

export async function getAllUsuarios() : Promise<Usuario[]> {
    return usuarios;
}

export async function getUsuarioById(id: number): Promise<Usuario> {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
      const error = new Error('Usuario not found');
      (error as any).statusCode = 404;
      throw error;
    }
    return usuario;
}

export async function createUsuario(usuarioData: CreateUsuarioRequest): Promise<Usuario> {
    const newUsuario: Usuario = {
      id: usuarios.length + 1,
      ...usuarioData
    };
    usuarios.push(newUsuario);
    return newUsuario; 
}

export async function updateUsuario(id: number, updatedData: UpdateUsuarioRequest): Promise<Usuario> {
    const usuarioIndex = usuarios.findIndex(u => u.id === id);
    if (usuarioIndex === -1) {
      const error = new Error('Book not found');
      (error as any).statusCode = 404;
      throw error;
    }
    usuarios[usuarioIndex] = { ...usuarios[usuarioIndex], ...updatedData };
    return usuarios[usuarioIndex];
}

export async function deleteUsuario(id: number): Promise<Usuario> {
    const deletedUsuario = usuarios.find(u => u.id === id)
    if (!deletedUsuario) {
        const error = new Error('Usuario no encontrado');
        (error as any).statusCode = 404;
        throw error;
    }
    usuarios = usuarios.filter(u => u.id !== id);
    return deletedUsuario;
}