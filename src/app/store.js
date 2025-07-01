import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/counter/UserSlice';

 const Store = configureStore({
  reducer: {
    user: userReducer,
  },
  // Optional: explicitly enable devTools (enabled by default in dev anyway)
  devTools: import.meta.env.MODE !== 'production',
});

export default Store
