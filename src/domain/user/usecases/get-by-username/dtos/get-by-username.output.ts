export interface GetUserByUsernameOutput {
  id: string;
  username: string;
  email: string;
  roles: string[];
  password?: string;
}
