import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '../../slicesNames';
import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';

export type TOrderState = {
  isRequesting: boolean;
  newOrderData: TOrder | null;
  previewOrder: TOrder | null;
  myOrders: TOrder[];
  orders: TOrder[];
  feed: { total: number; totalToday: number } | {};
  error: SerializedError | null;
};

export const getFeedsThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getFeeds`,
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const orderBurgerThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/orderBurger`,
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res.order;
  }
);

export const getOrdersThunk = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrders`,
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);

export const getOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/getOrderByNumber`,
  async (number: string) => {
    const res = await getOrderByNumberApi(number);
    return res.orders[0];
  }
);

const initialState: TOrderState = {
  isRequesting: false,
  newOrderData: null,
  previewOrder: null,
  myOrders: [],
  orders: [],
  feed: {},
  error: null
};

export const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.newOrderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurgerThunk.pending, (state) => {
        state.isRequesting = true;
        state.error = null;
        state.newOrderData = null;
      })
      .addCase(orderBurgerThunk.fulfilled, (state, action) => {
        state.isRequesting = false;
        state.newOrderData = action.payload;
      })
      .addCase(orderBurgerThunk.rejected, (state, action) => {
        state.isRequesting = false;
        state.error = action.error;
      })
      .addCase(getFeedsThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.feed = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getOrdersThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getOrdersThunk.fulfilled, (state, action) => {
        state.myOrders = action.payload;
      })
      .addCase(getOrdersThunk.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.previewOrder = null;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.previewOrder = action.payload;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.error = action.error;
      });
  },
  selectors: {
    selectIsRequesting: (state) => state.isRequesting,
    selectNewOrderData: (state) => state.newOrderData,
    selectPreviewOrder: (state) => state.previewOrder,
    selectMyOrders: (state) => state.myOrders,
    selectOrders: (state) => state.orders,
    selectFeed: (state) => state.feed
  }
});

export const {
  selectIsRequesting,
  selectNewOrderData,
  selectPreviewOrder,
  selectMyOrders,
  selectOrders,
  selectFeed
} = orderSlice.selectors;

export const { resetOrder } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
