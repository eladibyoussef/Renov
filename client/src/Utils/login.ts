// import jwtDecode from 'jwt-decode';

export const saveToken = (token: string): void => {
  localStorage.setItem('token', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const clearToken = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('permission');
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('permission');
  return !!token && !!role;
};

export function isAdmin(user: { permission: string }): boolean {
  return !!user && user.permission === 'admin';
}

export const getUserRole = (): string | null => {
  return localStorage.getItem('permission');
};

export const saveUserRole = (permission: string): void => {
  localStorage.setItem('permission', permission);
};

export const saveUsername = (username: string): void => {
  localStorage.setItem('name', username);
};

// export const getUserDetails = (): Record<string, unknown> | null => {
//   const token = getToken();
//   return token ? jwtDecode(token) : null;
// };

export const clearUserRole = (): void => {
  localStorage.removeItem('role');
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('permission');
};
