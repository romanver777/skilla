import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDateForFetch } from "../utils/utils";
import { TCalls } from "../types/calls-types";

type TDates = {
  startDate: number;
  endDate: number;
};

export const fetchCalls = createAsyncThunk<
  TCalls,
  TDates,
  { rejectValue: string }
>("calls/fetchCalls", async (dates, thunkApi) => {
  const start = getDateForFetch(dates.startDate);
  const end = getDateForFetch(dates.endDate);

  try {
    const response = await fetch(
      `https://api.skilla.ru/mango/getList?date_start=${start}&date_end=${end}`,
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
}

const initialState: ICallsInitialState = {
  calls: {
    total_rows: "",
    results: [],
  },
  loading: false,
  error: null,
};

export const fetchCallsSlice = createSlice({
  name: "fetch-calls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCalls.fulfilled, (state, action) => {
        state.loading = false;
        state.calls = action.payload;
      })
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export default fetchCallsSlice.reducer;
