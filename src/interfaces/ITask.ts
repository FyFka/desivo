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
  color: string;
  order: string[];
  title: string;
}

export interface ITaskColumnRaw {
  id: string;
  color: string;
  tasks: { [key: string]: ITask };
  order: string[];
  title: string;
}
