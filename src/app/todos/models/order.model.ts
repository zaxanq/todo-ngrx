import { Status } from '../enums/status.enum';
import { SortBy } from '../enums/sortBy.enum';
import { OrderEnum } from '../enums/order.enum';

export interface Order {
  sortBy: SortBy.date | SortBy.message;
  order: OrderEnum.asc | OrderEnum.desc;
  list?: Status.Todo | Status.Done;
}
