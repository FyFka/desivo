export interface IUserProfile {
  username: string;
  name: string;
  secondName: string;
}

export interface IUser extends IUserProfile {
  id: string;
  avatar: string;
}
