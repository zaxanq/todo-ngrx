import { Todo } from '../models/todo.model';
import { Order } from '../models/order.model';
import { OrderEnum } from '../enums/order.enum';
import { SortBy } from '../enums/sortBy.enum';

export const sort = (a: Todo, b: Todo, list: Order): number => {
  if (list.order === OrderEnum.asc) {
    if (list.sortBy === SortBy.date) {
      return a.id < b.id ? 1 : -1;
    }
    return a.message.toLowerCase() < b.message.toLowerCase() ? 1 : -1;
  } else if (list.order === OrderEnum.desc) {
    if (list.sortBy === SortBy.date) {
      return a.id > b.id ? 1 : -1;
    }
    return a.message.toLowerCase() > b.message.toLowerCase() ? 1 : -1;
  }
  return -1;
};
