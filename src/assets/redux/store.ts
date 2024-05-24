import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

// Configure the Redux store
export const store = configureStore({
  reducer: {
    contacts: contactsReducer, // Add the contacts reducer to the store
  },
});

// Export the RootState type to be used throughout the app
export type RootState = ReturnType<typeof store.getState>;
// Export the AppDispatch type to be used for dispatching actions
export type AppDispatch = typeof store.dispatch;
