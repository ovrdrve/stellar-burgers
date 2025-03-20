export {
  ingredientsSlice,
  getIngredientsThunk,
  selectIngredients,
  selectIsLoading,
  selectConstructorIngredients,
  selectIngredientById,
  addIngredient,
  deleteIngredient,
  moveUpIngredient,
  moveDownIngredient,
  ingredientsReducer
} from './ingredientsSlice';

export type { TIngredientState } from './ingredientsSlice';
