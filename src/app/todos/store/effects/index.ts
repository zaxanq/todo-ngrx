import { TodosEffect } from './todos.effect';
import { OrderEffect } from './order.effect';

export const effects: any[] = [
  TodosEffect,
  OrderEffect,
];

export * from './todos.effect';
export * from './order.effect';
