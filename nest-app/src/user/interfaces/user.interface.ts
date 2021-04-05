export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  status?: 'ACTIVE' | 'DEACTIVATED';
  deletedAt?: string;
}
