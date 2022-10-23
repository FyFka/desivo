export interface ILabel {
  id: string;
  color: string;
  name: string;
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  labels: ILabel[];
}

export interface ITaskColumn {
  id: string;
  tasks: ITask[];
  title: string;
}
