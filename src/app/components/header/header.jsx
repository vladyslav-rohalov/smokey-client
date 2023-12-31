'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useCart } from '../../hooks/useCart';
import { useModal } from '../../hooks/useModal';
import { useAuth } from '../../hooks/useAuth';
import { toggleAccount, toggleProducts } from '../../redux/modal/slice';
import { toggleCart, toggleMobile } from '../../redux/modal/slice';
import { toggleOrder, togglePayment } from '../../redux/modal/slice';
import { toggleSuccess } from '../../redux/modal/slice';
import { Container, Toolbar, Box } from '@mui/material';
import MobileMenu from './mobileMenu/mobileMenu';
import DrawerMenu from './drawer/drawer';
import Logo from './logo/logo';
import ProductsButton from './productsButton/productsButton';
import ProductsModal from './productsModal/productsModal';
import SearchForm from './searchForm/searchForm';
import PersonalAccount from './personalAccount/personalAccount';
import CartIcon from './CartIcon/CartIcon';
import Auth from '../auth/auth';
import ShoppingCart from '../shoppingCart/shoppingCart';
import Order from '../order/order';
import Payment from '../order/payment/payment';
import SuccessModal from '../modal/successModal/successModal';
import { AppBar } from './header.styled';
import Modal from '../modal/modal';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Header() {
  const [login, setLogin] = useState(true);
  const { cartModal, accountModal, mobileModal, productsModal } = useModal();
  const { orderModal, paymentModal, successModal } = useModal();

  const { cart, cartProducts } = useCart();
  const { isLogin } = useAuth();

  const cartQuantity = isLogin ? cartProducts.length : cart.length;

  const mediaMD = useMediaQuery('(min-width:900px)');

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(toggleProducts(false));
  };

  const handleAuth = () => {
    dispatch(toggleAccount(true));
    dispatch(toggleMobile(false));
  };

  const handleOpenCart = () => {
    dispatch(toggleCart(true));
  };

  return (
    <>
      <AppBar>
        <Container maxWidth="xl" sx={{ px: 3 }}>
          <Toolbar style={{ padding: 0 }}>
            <MobileMenu toggle={() => dispatch(toggleMobile(!mobileModal))} />
            <Logo isMobile={false} mediaMD={mediaMD} />
            {mediaMD && (
              <ProductsButton
                onOpenProductsModal={() => dispatch(toggleProducts(true))}
              />
            )}
            <SearchForm />

            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
              <PersonalAccount
                onOpenAccountModal={handleAuth}
                isLogin={isLogin}
              />
              <CartIcon
                onOpenCartModal={handleOpenCart}
                totalProducts={cartQuantity}
              />
            </Box>
          </Toolbar>
          <DrawerMenu
            mobileOpen={mobileModal}
            handleDrawerToggle={() => dispatch(toggleMobile(!mobileModal))}
            openAuth={handleAuth}
            isLogin={isLogin}
            handleOpenCart={handleOpenCart}
          />
          {productsModal && (
            <Modal
              open={productsModal}
              close={handleCloseModal}
              title="Products"
              width="calc(100% - 48px)"
              height="600px"
              position="top"
            >
              <ProductsModal handleCloseModal={handleCloseModal} />
            </Modal>
          )}
          {accountModal && (
            <Modal
              open={accountModal}
              close={() => dispatch(toggleAccount(false))}
              title={login ? 'Log In' : 'Register'}
              width="600px"
              position="center"
            >
              <Auth
                toggleAuth={() => setLogin(!login)}
                login={login}
                closeModal={() => dispatch(toggleAccount(false))}
              />
            </Modal>
          )}
          {successModal && (
            <Modal
              open={successModal}
              close={() => dispatch(toggleSuccess(false))}
              title="Successfully"
              width="600px"
              height="auto"
              position="center"
            >
              <SuccessModal
                text={
                  'Your account is registered but need to confirm your email, please click the button in your email.'
                }
              />
            </Modal>
          )}
          {cartModal && (
            <Modal
              open={cartModal}
              close={() => dispatch(toggleCart(false))}
              title="Cart"
              width="600px"
              height="600px"
              position="center"
            >
              <ShoppingCart />
            </Modal>
          )}
          {orderModal && (
            <Modal
              open={orderModal}
              close={() => dispatch(toggleOrder(false))}
              title="Order"
              width="600px"
              height="600px"
              position="center"
            >
              <Order />
            </Modal>
          )}
          {paymentModal && (
            <Modal
              open={paymentModal}
              close={() => dispatch(togglePayment(false))}
              title="Payment"
              width="600px"
              height="600px"
              position="center"
            >
              <Payment />
            </Modal>
          )}
        </Container>
      </AppBar>
    </>
  );
}
