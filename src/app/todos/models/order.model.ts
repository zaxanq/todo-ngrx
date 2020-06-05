import { Status } from '../enums/status.enum';

export interface Order {
  sortBy: 'date' | 'message';
  order: 'asc' | 'desc';
  list?: Status.Todo | Status.Done;
}
