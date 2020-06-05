import { Status } from '../enums/status.enum';

export interface Order {
  sortBy: 'date' | 'message';
  order: 'asc' | 'desc';
  id?: 'finished' | 'unfinished';
}
