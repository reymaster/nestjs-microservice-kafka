export interface IUser {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  password: string;
  createdAt?: string;
  status?: 'ACTIVE' | 'DEACTIVATED';
  deletedAt?: string;
}
