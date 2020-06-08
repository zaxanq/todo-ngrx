import { Status } from '../enums/status.enum';
import { SortBy } from '../enums/sortBy.enum';
import { OrderEnum } from '../enums/order.enum';

export interface Order {
  sortBy: SortBy;
  order: OrderEnum;
  list?: Status;
}
