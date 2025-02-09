export interface AppUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    cpf: string;
    gender: string;
    birthDate: string;
    username: string;
    password: string;
    role: string;
}

export enum UserRole {
  ADMIN = 'ADMINISTRADOR',
  PARTNER = 'COLABORADOR',
  USER = 'USUÁRIO',
}
