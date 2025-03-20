import { rootReducer } from './rootReducer';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';

describe('rootReducer', () => {
  test('rootReducer should handle unknown action correctly', () => {
    const unknownTestAction = { type: 'UNKNOWN_ACTION' };
    const expectedState = {
      ingredients: {
        isLoading: true,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: []
        },
        error: null
      },
      order: {
        isRequesting: false,
        newOrderData: null,
        previewOrder: null,
        myOrders: [],
        orders: [],
        feed: {},
        error: null
      },
      user: {
        isAuthChecked: true,
        user: null,
        error: null
      }
    };

    const actualState = rootReducer(undefined, unknownTestAction);

    expect(actualState).toEqual(expectedState);
  });
});
