import { Status } from '../enums/status.enum';

export interface DragDetails {
  todoId: string;
  newTargetList: Status;
}
