export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  id?: string;
}

export interface AuthSliceState {
  accessToken: string;
  hasCheckedToken: boolean;
  handleSaveToken(token: string): void;
  handleLoadToken(): void;
  handleLogOut(): void;
  handleClearToken(key: string): void;
}
