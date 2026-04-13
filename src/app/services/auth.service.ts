import { Injectable, signal } from '@angular/core';

export type UserRole = 'paciente' | 'enfermero' | null;

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Simulación de sesión — reemplazar con llamada real al backend
  private _user = signal<AuthUser | null>({
    id: 1,
    name: 'María González',
    email: 'maria@example.com',
    role: 'paciente',
    avatar: 'MG'
  });

  readonly user = this._user.asReadonly();

  get role(): UserRole {
    return this._user()?.role ?? null;
  }

  get isLoggedIn(): boolean {
    return this._user() !== null;
  }

  // Demo: permite cambiar de rol sin backend
  setRole(role: UserRole) {
    const user = this._user();
    if (!user) return;
    if (role === 'enfermero') {
      this._user.set({ id: 2, name: 'Carlos Ramírez', email: 'carlos@example.com', role: 'enfermero', avatar: 'CR' });
    } else {
      this._user.set({ id: 1, name: 'María González', email: 'maria@example.com', role: 'paciente', avatar: 'MG' });
    }
  }

  logout() {
    this._user.set(null);
  }
}