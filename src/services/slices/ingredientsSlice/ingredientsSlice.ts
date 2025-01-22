import { getIngredientsApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TConstructorIngredients, TIngredient } from '@utils-types';
import { RootState } from '../../store';
import { INGREDIENTS_SLICE_NAME } from '../../slicesNames';
import { nanoid } from 'nanoid';

export type TIngredientState = {
  isLoading: boolean;
  ingredients: TIngredient[];
  constructorIngredients: TConstructorIngredients;
  error: SerializedError | null;
};

export const getIngredientsThunk = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/getIngredients`,
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);

const initialState: TIngredientState = {
  isLoading: true,
  ingredients: [],
  constructorIngredients: {
    bun: null,
    ingredients: []
  },
  error: null
};

export const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload, id: nanoid() };
      ingredient.type === 'bun'
        ? (state.constructorIngredients.bun = ingredient)
        : state.constructorIngredients.ingredients.push(ingredient);
    },
    deleteIngredient: (state, action) => {
      const i = action.payload;
      state.constructorIngredients.ingredients.splice(i, 1);
    },
    moveUpIngredient: (state, action) => {
      const i = action.payload;
      const ingredients = state.constructorIngredients.ingredients;
      ingredients.splice(i - 1, 2, ingredients[i], ingredients[i - 1]);
    },
    moveDownIngredient: (state, action) => {
      const i = action.payload;
      const ingredients = state.constructorIngredients.ingredients;
      ingredients.splice(i, 2, ingredients[i + 1], ingredients[i]);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredientsThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(getIngredientsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading,
    selectConstructorIngredients: (state) => state.constructorIngredients
  }
});

export const {
  selectIngredients,
  selectIsLoading,
  selectConstructorIngredients
} = ingredientsSlice.selectors;
export const selectIngredientById = (id: string) => (state: RootState) =>
  state.ingredients.ingredients.find((ing) => ing._id === id);

export const {
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient
} = ingredientsSlice.actions;

export const ingredientsReducer = ingredientsSlice.reducer;
