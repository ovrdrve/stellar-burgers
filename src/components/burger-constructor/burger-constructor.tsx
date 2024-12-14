import { FC, useMemo } from 'react';

import { TConstructorIngredient, TConstructorIngredients } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { selectConstructorIngredients } from '../../services/slices/ingredientsSlice';
import {
  orderBurgerThunk,
  resetOrder,
  selectIsRequesting,
  selectNewOrderData
} from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const constructorItems = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectIsRequesting);
  const orderModalData = useSelector(selectNewOrderData);

  const normilizeOrderData = (order: TConstructorIngredients): string[] => [
    order.bun!._id,
    ...order.ingredients.map((ing) => ing._id),
    order.bun!._id
  ];

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderBurgerThunk(normilizeOrderData(constructorItems)));
  };
  const closeOrderModal = () => dispatch(resetOrder());

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
