export interface IResponse<T = unknown> {
  message?: string;
  value?: T;
}
