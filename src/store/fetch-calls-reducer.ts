import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDateForFetch } from "../utils/utils";
import { TCalls } from "../types/calls-types";

type TDatesPages = {
  dates: {
    startDate: number;
    endDate: number;
  };
  pageNumber: number;
};

export const fetchCalls = createAsyncThunk<
  TCalls,
  TDatesPages,
  { rejectValue: string }
>("calls/fetchCalls", async (data, thunkApi) => {
  const start = getDateForFetch(data.dates.startDate);
  const end = getDateForFetch(data.dates.endDate);
  const offset = data.pageNumber * 50;

  try {
    const response = await fetch(
      `https://api.skilla.ru/mango/getList?date_start=${start}&date_end=${end}&offset=${offset}`,
      {
        method: "POST",
        headers: { Authorization: "Bearer testtoken" },
        redirect: "follow",
      }
    );
    return response.json();
  } catch (error) {
    return thunkApi.rejectWithValue("Что-то пошло не так..");
  }
});

export interface ICallsInitialState {
  calls: TCalls;
  loading: boolean;
  error: string | null;
  pageNumber: number;
}

const initialState: ICallsInitialState = {
  calls: {
    total_rows: "",
    results: [],
  },
  loading: false,
  error: null,
  pageNumber: 0,
};

export const fetchCallsSlice = createSlice({
  name: "fetch-calls",
  initialState,
  reducers: {
    addPageNumber: (state) => {
      state.pageNumber = state.pageNumber + 1;
    },
    resetPageNumber: (state) => {
      state.pageNumber = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.loading = false;

        if (state.pageNumber > 0) {
          state.calls.results = [
            ...state.calls.results,
            ...action.payload.results,
          ];
        } else {
          state.calls = action.payload;
        }
        state.pageNumber++;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const { addPageNumber, resetPageNumber } = fetchCallsSlice.actions;
export default fetchCallsSlice.reducer;
