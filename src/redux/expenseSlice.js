import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as expenseService from '../services/expenseService';

// Async Thunks
export const getExpenses = createAsyncThunk('expenses/getExpenses', async (userId) => {
    const response = await expenseService.fetchExpenses(userId);
    return response.data;
  }
);

export const createExpense = createAsyncThunk('expenses/createExpense', async (expenseData) => {
    const response = await expenseService.addExpense(expenseData);
    return response.data;
  }
);

export const removeExpense = createAsyncThunk('expenses/removeExpense', async (id) => {
    await expenseService.deleteExpense(id);
    return id; 
  }
);

export const modifyExpense = createAsyncThunk('expenses/modifyExpense', async ({ id, updatedExpense }) => {
    const response = await expenseService.updateExpense(id, updatedExpense);
    return response.data;
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    filterCategory: 'All categories',
    editingExpense: null,
  },
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    setEditingExpense: (state, action) => {
      state.editingExpense = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(getExpenses.pending, (state) => { state.status = 'loading'; })
      .addCase(getExpenses.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.items = action.payload; 
      })
      // CRUD
      .addCase(createExpense.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.items = state.items.filter(expense => expense.id !== action.payload);
      })
      .addCase(modifyExpense.fulfilled, (state, action) => {
        const index = state.items.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.editingExpense = null;
      });
  },
});

export const { setFilterCategory, setEditingExpense } = expenseSlice.actions;
export default expenseSlice.reducer;