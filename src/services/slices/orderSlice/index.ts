export {
  orderSlice,
  getOrderByNumber,
  getOrdersThunk,
  orderBurgerThunk,
  getFeedsThunk,
  selectIsRequesting,
  selectNewOrderData,
  selectPreviewOrder,
  selectMyOrders,
  selectOrders,
  selectFeed,
  resetOrder,
  orderReducer
} from './orderSlice';

export type { TOrderState } from './orderSlice';
