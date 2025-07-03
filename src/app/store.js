import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../app/features/counter/UserSlice';
import userListReducer from '../app/features/counter/UserList'
 const Store = configureStore({
  reducer: {
    user: userReducer,
    userList:userListReducer
  },
  // Optional: explicitly enable devTools (enabled by default in dev anyway)
  devTools: import.meta.env.MODE !== 'production',
});

export default Store
