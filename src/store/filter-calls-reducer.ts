import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IFiltersCalls {
  filterTypes: {
    name: string;
    activeFilter: string;
  };
  filterStaff: {
    name: string;
    activeFilter: string;
  };
}

const initialState: IFiltersCalls = {
  filterTypes: {
    name: "Все типы",
    activeFilter: "Все типы",
  },
  filterStaff: {
    name: "Все сотрудники",
    activeFilter: "Все сотрудники",
  },
};

export const filterCallsSlice = createSlice({
  name: "filter-calls",
  initialState,
  reducers: {
    setActiveFilterCalls: (
      state,
      action: PayloadAction<{ name: string; item: string }>
    ) => {
      switch (action.payload.name) {
        case "Все типы":
          {
            state.filterTypes.activeFilter = action.payload.item;
          }
          break;
        case "Все сотрудники":
          {
            state.filterStaff.activeFilter = action.payload.item;
          }
          break;
      }
    },
    resetFilters: (state) => {
      state.filterTypes.activeFilter = state.filterTypes.name;
      state.filterStaff.activeFilter = state.filterStaff.name;
    },
  },
});

export const { setActiveFilterCalls, resetFilters } = filterCallsSlice.actions;
export default filterCallsSlice.reducer;
