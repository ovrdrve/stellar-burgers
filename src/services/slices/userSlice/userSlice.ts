import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import { USER_SLICE_NAME } from '../../slicesNames';
import { isActionPending, isActionRejected } from '../../../utils/redux';
import { UnknownAsyncThunkRejectedAction } from '@reduxjs/toolkit/dist/matchers';

export type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  error: SerializedError | null;
};

export const registerUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/registerUser`,
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const loginUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/loginUser`,
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);
    return res.user;
  }
);

export const logoutUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/logoutUser`,
  async () => {
    await logoutApi();
  }
);

export const getUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

export const updateUserThunk = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

const initialState: TUserState = {
  isAuthChecked: true,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isAuthChecked = true;
        state.user = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
      })
      .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
        state.isAuthChecked = false;
        state.error = null;
      })
      .addMatcher<UnknownAsyncThunkRejectedAction>(
        isActionRejected(USER_SLICE_NAME),
        (state, action) => {
          state.isAuthChecked = true;
          state.error = action.error;
        }
      );
  },
  selectors: {
    selectIsAuthCheked: (state) => state.isAuthChecked,
    selectUser: (state) => state.user
  }
});

export const { selectIsAuthCheked, selectUser } = userSlice.selectors;

export const {} = userSlice.actions;
export const userReducer = userSlice.reducer;
