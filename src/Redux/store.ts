import { configureStore } from '@reduxjs/toolkit';
import logoReducer from '../Redux/Reducer/logoSlice';

const store = configureStore({
  reducer: {
    logo: logoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
