import { Teams } from '@/types';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  team: Teams;
}

export interface AuthSliceState {
  isAuthenticated: boolean;
  hasCheckedToken: boolean;
  handleSetAuthenticated(isAuth: boolean): void;
  handleCheckAuth(): void;
  handleLogout(): void;
}
