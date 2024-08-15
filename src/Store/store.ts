import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../Redux/Loginreducer/reducer'
import Productreducer from '../Redux/Product/Productreducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: Productreducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;


