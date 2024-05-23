import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  status: 'active' | 'inactive';
}

interface ContactsState {
  contacts: Contact[];
}

const initialState: ContactsState = {
  contacts: [],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action: PayloadAction<Contact>) => {
        state.contacts.push(action.payload);
      },
      prepare: (firstName: string, lastName: string, status: 'active' | 'inactive') => ({
        payload: {
          id: nanoid(),
          firstName,
          lastName,
          status,
        },
      }),
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.contacts.findIndex(contact => contact.id === action.payload.id);
      if (index !== -1) {
        state.contacts[index] = action.payload;
      }
    },
    setContactsFromLocalStorage: (state) => {
      const savedContactsJSON = localStorage.getItem('contacts');
      if (savedContactsJSON) {
        state.contacts = JSON.parse(savedContactsJSON);
      }
    },
  },
});

export const { addContact, deleteContact, updateContact, setContactsFromLocalStorage } = contactsSlice.actions;
export default contactsSlice.reducer;
export type { Contact };
