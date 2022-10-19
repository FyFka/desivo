import { IUser } from "./IUser";

export interface IMessage {
  id: string;
  message: string;
  project: string;
  time: string;
  user: IUser;
}

export interface IMessageRaw extends Omit<IMessage, "time"> {
  timestamp: number;
}
