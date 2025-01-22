import {
  getFeedsThunk,
  getOrderByNumber,
  getOrdersThunk,
  orderBurgerThunk,
  orderReducer,
  resetOrder
} from './orderSlice';

describe('orderSlice', () => {
  const initialState = {
    isRequesting: false,
    newOrderData: null,
    previewOrder: null,
    myOrders: [],
    orders: [],
    feed: {},
    error: null
  };

  const testOrder = {
    _id: '123',
    status: 'done',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    number: 111,
    ingredients: []
  };

  const testFeedsData = {
    success: true,
    orders: [testOrder],
    total: 1,
    totalToday: 2
  };

  const testError = {
    message: 'test error',
    name: 'Error',
    stack: 'Error: test error'
  };

  describe('getFeedsThunk', () => {
    test('pending should set error to null', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        { ...initialState, error: testError },
        getFeedsThunk.pending('')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set orders and feeds data', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [testOrder],
        feed: { total: 1, totalToday: 2 },
        error: null
      };

      const actualState = orderReducer(
        initialState,
        getFeedsThunk.fulfilled(testFeedsData, '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set orders and feeds data', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: testError
      };

      const actualState = orderReducer(
        initialState,
        getFeedsThunk.rejected(testError, '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('orderBurgerThunk', () => {
    test('pending should set error, newOrderData to null and isRequesting to true', () => {
      const expectedState = {
        isRequesting: true,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        { ...initialState, newOrderData: testOrder, error: testError },
        orderBurgerThunk.pending('', [])
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set newOrderData and isRequesting to false', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: testOrder,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        { ...initialState, isRequesting: true },
        orderBurgerThunk.fulfilled(testOrder, '', [])
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isRequesting to false', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: testError
      };

      const actualState = orderReducer(
        { ...initialState, isRequesting: true },
        orderBurgerThunk.rejected(testError, '', [])
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('getOrdersThunk', () => {
    test('pending should set error to null', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        { ...initialState, error: testError },
        getOrdersThunk.pending('')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set myOrderData', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [testOrder],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        { ...initialState },
        getOrdersThunk.fulfilled([testOrder], '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: testError
      };

      const actualState = orderReducer(
        initialState,
        getOrdersThunk.rejected(testError, '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('getOrderByNumber', () => {
    test('pending should set error and previewOrder to null', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        {
          ...initialState,
          previewOrder: testOrder,
          error: testError
        },
        getOrderByNumber.pending('', '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set previewOrder', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: testOrder,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      };

      const actualState = orderReducer(
        initialState,
        getOrderByNumber.fulfilled(testOrder, '', '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error', () => {
      const expectedState = {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: testError
      };

      const actualState = orderReducer(
        initialState,
        getOrderByNumber.rejected(testError, '', '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  test('resetOrder should delete newOrderData', () => {
    const expectedState = {
      isRequesting: false,
      newOrderData: null,
      previewOrder: null,
      myOrders: [],
      orders: [],
      feed: {},
      error: null
    };

    const actualState = orderReducer(
      { ...initialState, newOrderData: testOrder },
      resetOrder()
    );

    expect(actualState).toEqual(expectedState);
  });
});
