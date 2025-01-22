import {
  userReducer,
  getUserThunk,
  updateUserThunk,
  TUserState,
  registerUserThunk,
  loginUserThunk,
  logoutUserThunk
} from '.';

describe('userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: true,
    user: null,
    error: null
  };

  const testUserData = {
    email: 'test@email.com',
    name: 'test'
  };

  const testError = {
    message: 'test error',
    name: 'Error',
    stack: 'Error: test error'
  };

  describe('getUserThunk', () => {
    test('pending should set isAuthChecked to false and error to null', () => {
      const expectedState = {
        isAuthChecked: false,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: true,
          error: testError
        },
        getUserThunk.pending('')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set user data and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: testUserData,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        getUserThunk.fulfilled(testUserData, '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: testError
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        getUserThunk.rejected(testError, '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('updateUserThunk', () => {
    const updatedUserData = {
      name: 'test1'
    };

    test('pending should set isAuthChecked to false and error to null', () => {
      const expectedState = {
        isAuthChecked: false,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: testError
        },
        updateUserThunk.pending('', updatedUserData)
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set user data and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: { ...testUserData, name: 'test1' },
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          user: testUserData,
          isAuthChecked: false
        },
        updateUserThunk.fulfilled(
          { ...testUserData, name: 'test1' },
          '',
          updatedUserData
        )
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: testError
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        updateUserThunk.rejected(testError, '', updatedUserData)
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('registerUserThunk', () => {
    const registerUserData = {
      email: 'test@email.com',
      name: 'test1',
      password: 'test'
    };

    test('pending should set isAuthChecked to false and error to null', () => {
      const expectedState = {
        isAuthChecked: false,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: testError
        },
        registerUserThunk.pending('', registerUserData)
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set user data and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: testUserData,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        registerUserThunk.fulfilled(testUserData, '', registerUserData)
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: testError
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        registerUserThunk.rejected(testError, '', registerUserData)
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('loginUserThunk', () => {
    const loginUserData = {
      email: 'test@email.com',
      password: 'test'
    };

    test('pending should set isAuthChecked to false and error to null', () => {
      const expectedState = {
        isAuthChecked: false,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: testError
        },
        loginUserThunk.pending('', loginUserData)
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set user data and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: testUserData,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        loginUserThunk.fulfilled(testUserData, '', loginUserData)
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: testError
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        loginUserThunk.rejected(testError, '', loginUserData)
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('logoutUserThunk', () => {
    test('pending should set isAuthChecked to false and error to null', () => {
      const expectedState = {
        isAuthChecked: false,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          error: testError
        },
        logoutUserThunk.pending('')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set user data and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: null
      };

      const actualState = userReducer(
        {
          ...initialState,
          user: {
            email: 'test@email.com',
            name: 'test'
          }
        },
        logoutUserThunk.fulfilled(undefined, '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isAuthChecked to true', () => {
      const expectedState = {
        isAuthChecked: true,
        user: null,
        error: testError
      };

      const actualState = userReducer(
        {
          ...initialState,
          isAuthChecked: false
        },
        logoutUserThunk.rejected(testError, '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });
});
