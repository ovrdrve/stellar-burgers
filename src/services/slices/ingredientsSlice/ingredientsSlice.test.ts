import {
  addIngredient,
  deleteIngredient,
  getIngredientsThunk,
  ingredientsReducer,
  moveDownIngredient,
  moveUpIngredient,
  TIngredientState
} from './ingredientsSlice';

describe('ingredientsSlice', () => {
  const initialState: TIngredientState = {
    isLoading: true,
    ingredients: [],
    constructorIngredients: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const testIngredientsData = [
    {
      _id: '123',
      name: 'bun',
      type: 'bun',
      proteins: 11,
      fat: 22,
      carbohydrates: 33,
      calories: 44,
      price: 100,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile'
    },
    {
      _id: '423',
      name: 'main',
      type: 'main',
      proteins: 11,
      fat: 22,
      carbohydrates: 33,
      calories: 44,
      price: 100,
      image: 'image',
      image_large: 'image_large',
      image_mobile: 'image_mobile'
    }
  ];

  const testMainIngredient = {
    id: '423',
    _id: '423',
    name: 'main',
    type: 'main',
    proteins: 11,
    fat: 22,
    carbohydrates: 33,
    calories: 44,
    price: 100,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  };

  const testSauceIngredient = {
    id: '523',
    _id: '523',
    name: 'sauce',
    type: 'sauce',
    proteins: 11,
    fat: 22,
    carbohydrates: 33,
    calories: 44,
    price: 100,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  };

  const testBunIngredient = {
    id: '423',
    _id: '123',
    name: 'bun',
    type: 'bun',
    proteins: 11,
    fat: 22,
    carbohydrates: 33,
    calories: 44,
    price: 100,
    image: 'image',
    image_large: 'image_large',
    image_mobile: 'image_mobile'
  };

  const testError = {
    message: 'test error',
    name: 'Error',
    stack: 'Error: test error'
  };

  describe('getIngredientsThunk', () => {
    test('pending should set isLoading to true and error to null', () => {
      const expectedState = {
        isLoading: true,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: []
        },
        error: null
      };

      const actualState = ingredientsReducer(
        {
          ...initialState,
          isLoading: false,
          error: testError
        },
        getIngredientsThunk.pending('')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('fulfilled should set ingredients and isLoading to false', () => {
      const expectedState = {
        isLoading: false,
        ingredients: testIngredientsData,
        constructorIngredients: {
          bun: null,
          ingredients: []
        },
        error: null
      };

      const actualState = ingredientsReducer(
        initialState,
        getIngredientsThunk.fulfilled(testIngredientsData, '')
      );

      expect(actualState).toEqual(expectedState);
    });

    test('rejected should set error and isLoading to false', () => {
      const expectedState = {
        isLoading: false,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: []
        },
        error: testError
      };

      const actualState = ingredientsReducer(
        initialState,
        getIngredientsThunk.rejected(testError, '')
      );

      expect(actualState).toEqual(expectedState);
    });
  });

  describe('constructor', () => {
    test('addIngredient should add bun', () => {
      const expectedState = {
        bun: testBunIngredient,
        ingredients: []
      };

      const actualState = ingredientsReducer(
        initialState,
        addIngredient(testBunIngredient)
      );

      expect(actualState.constructorIngredients).toEqual({
        ...expectedState,
        bun: { ...testBunIngredient, id: expect.any(String) }
      });
    });

    test('addIngredient should add ingredient', () => {
      const expectedState = {
        bun: null,
        ingredients: [testMainIngredient]
      };

      const actualState = ingredientsReducer(
        initialState,
        addIngredient(testMainIngredient)
      );

      expect(actualState.constructorIngredients).toEqual({
        ...expectedState,
        ingredients: [{ ...testMainIngredient, id: expect.any(String) }]
      });
    });

    test('deleteIngredient', () => {
      const initialState = {
        isLoading: true,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: [testSauceIngredient, testMainIngredient]
        },
        error: null
      };

      const expectedState = {
        bun: null,
        ingredients: [testMainIngredient]
      };

      const actualState = ingredientsReducer(initialState, deleteIngredient(0));

      expect(actualState.constructorIngredients).toEqual(expectedState);
    });

    test('moveUpIngredient', () => {
      const initialState = {
        isLoading: true,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: [testSauceIngredient, testMainIngredient]
        },
        error: null
      };

      const expectedState = {
        bun: null,
        ingredients: [testMainIngredient, testSauceIngredient]
      };

      const actualState = ingredientsReducer(initialState, moveUpIngredient(1));

      expect(actualState.constructorIngredients).toEqual(expectedState);
    });

    test('moveDownIngredient', () => {
      const initialState = {
        isLoading: true,
        ingredients: [],
        constructorIngredients: {
          bun: null,
          ingredients: [testSauceIngredient, testMainIngredient]
        },
        error: null
      };

      const expectedState = {
        bun: null,
        ingredients: [testMainIngredient, testSauceIngredient]
      };

      const actualState = ingredientsReducer(initialState, moveDownIngredient(0));

      expect(actualState.constructorIngredients).toEqual(expectedState);
    });
  });
});
