export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  addresses: string[];
  authorities: {
    authority: string;
  }[];
}
