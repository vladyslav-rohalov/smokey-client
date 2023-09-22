import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  brand: [],
  color: [],
  price: [],
  size: [],
  status: [],
  type: [],
  weight: [],
  flavor: [],
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addFilter(state, action) {
      const { filterName, filterValue } = action.payload;
      state[filterName] = [...state[filterName], filterValue];
    },
    removeFilter(state, action) {
      const { filterName, filterValue } = action.payload;
      state[filterName] = state[filterName].filter(
        value => value !== filterValue
      );
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { addFilter, removeFilter, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;