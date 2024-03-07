import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface table {
  tableNumber: number;
  barId: number;
  id: number;
  isOccupied: boolean;
  ability: number;
  location: string;
}

const initialState: table = {
  ability: 0,
  barId: 0,
  id: 0,
  isOccupied: false,
  location: 'top',
  tableNumber: 0,
};

const tableSlice = createSlice({
  name: 'Table',
  initialState,
  reducers: {
    tableSet: (state, action: PayloadAction<table>) => {
        state.ability = action.payload.ability;
        state.barId = action.payload.barId;
        state.id = action.payload.id;
        state.isOccupied = action.payload.isOccupied;
        state.location = action.payload.location;
        state.tableNumber = action.payload.tableNumber;
      },
      tableReset: (state) => {
          state.ability= 0;
          state.barId= 0;
          state.id= 0;
          state.isOccupied= false;
          state.location= 'top';
          state.tableNumber= 0;
      },
  },
});

export const {tableSet, tableReset} = tableSlice.actions;
export default tableSlice.reducer;
