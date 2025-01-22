import { rootReducer } from './rootReducer';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';

describe('rootReducer', () => {
  test('rootReducer should handle unknown action correctly', () => {
    const unknownTestAction = { type: 'UNKNOWN_ACTION' };
    const expectedState = {
      ingredients: ingredientsReducer(undefined, unknownTestAction),
      order: orderReducer(undefined, unknownTestAction),
      user: userReducer(undefined, unknownTestAction)
    };

    const actualState = rootReducer(undefined, unknownTestAction);

    expect(actualState).toEqual(expectedState);
  });
});
