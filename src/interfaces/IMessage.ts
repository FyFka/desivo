export interface IMessage {
  username: string;
  time: string;
  message: string;
}

export interface IMessageRaw extends Omit<IMessage, "time"> {
  time: number;
}
