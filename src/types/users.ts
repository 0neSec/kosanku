import { UserRole } from "@prisma/client";

export interface UserInput {
    id:string;
    name: string;
    email: string;
    password: string;
    noWa: string;
    desa?: string;
    kecamatan?: string;
    kabupaten?: string;
    role: UserRole;
  }

  export interface UserUpdateParams {
    id: string;
  }
  
  export interface UserUpdateInput {
    name?: string;
    email?: string;
    noWa?: string;
    desa?: string;
    kecamatan?: string;
    kabupaten?: string;
  }
  
  export interface UserUpdateParams {
    id: string;
  }