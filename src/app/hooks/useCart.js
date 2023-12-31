import { useSelector } from 'react-redux';
import {
  selectCart,
  selectError,
  selectIsLoading,
  selectProducts,
} from '../redux/cart/selectors';

export const useCart = () => {
  const cart = useSelector(selectCart);
  const cartProducts = useSelector(selectProducts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return {
    cart,
    cartProducts,
    isLoading,
    error,
  };
};
