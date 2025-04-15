export interface GetUserByIdOutput {
  id: string;
  username: string;
  email: string;
  roles: string[];
  password?: string;
}
