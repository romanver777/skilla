import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  getDefaultThreeDaysDates,
  getDefaultWeekDates,
  getDefaultMonthDates,
  getDefaultYearsDates,
  getFirstDayofMonthByDate,
  getLastDayofMonthByDate,
  getYearsDate,
} from "../utils/utils";

export type TActiveFilter = "3 дня" | "Неделя" | "Месяц" | "Год" | "Даты";

const oneDayMs = 24 * 60 * 60 * 1000;
const numberForThreeDays = 3;
const numberForWeek = 7;

export interface IFilterDateInitialState {
  list: string[];
  activeFilter: string;
  dates: {
    startDate: number;
    endDate: number;
  };
}

const initialState: IFilterDateInitialState = {
  list: ["3 дня", "Неделя", "Месяц", "Год", "Даты"],
  activeFilter: "3 дня",
  dates: {
    startDate: getDefaultThreeDaysDates(Date.now()).start,
    endDate: getDefaultThreeDaysDates(Date.now()).end,
  },
};

export const filterDateSlice = createSlice({
  name: "filter-date",
  initialState,
  reducers: {
    setActiveFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = action.payload;
    },
    setDefaultDates: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "3 дня":
          {
            state.dates.startDate = Date.now() - numberForThreeDays * oneDayMs;
            state.dates.endDate = Date.now();
          }
          break;
        case "Неделя":
          {
            state.dates.startDate = getDefaultWeekDates(Date.now()).start;
            state.dates.endDate = getDefaultWeekDates(Date.now()).end;
          }
          break;
        case "Месяц":
          {
            state.dates.startDate = getDefaultMonthDates(Date.now()).start;
            state.dates.endDate = getDefaultMonthDates(Date.now()).end;
          }
          break;
        case "Год": {
          state.dates.startDate = getDefaultYearsDates(Date.now()).start;
          state.dates.endDate = getDefaultYearsDates(Date.now()).end;
        }
      }
    },
    setCastomDates: (
      state,
      action: PayloadAction<{ startDate: string; endDate: string }>
    ) => {
      state.dates.startDate = new Date(action.payload.startDate).getTime();
      state.dates.endDate = new Date(action.payload.endDate).getTime();
    },
    setBackDates: (state) => {
      switch (state.activeFilter) {
        case "3 дня":
          {
            state.dates.endDate = state.dates.startDate - oneDayMs;
            state.dates.startDate =
              state.dates.startDate - numberForThreeDays * oneDayMs;
          }
          break;
        case "Неделя":
          {
            state.dates.endDate = state.dates.startDate - oneDayMs;
            state.dates.startDate =
              state.dates.startDate - numberForWeek * oneDayMs;
          }
          break;
        case "Месяц":
          {
            state.dates.endDate = state.dates.startDate - oneDayMs;
            state.dates.startDate = getFirstDayofMonthByDate(
              state.dates.startDate - oneDayMs
            );
          }
          break;
        case "Год":
          {
            state.dates.endDate = getYearsDate(state.dates.endDate, -1).end;
            state.dates.startDate = getYearsDate(
              state.dates.startDate,
              -1
            ).start;
          }
          break;
      }
    },
    setForwardDates: (state) => {
      switch (state.activeFilter) {
        case "3 дня":
          {
            state.dates.startDate = state.dates.endDate + oneDayMs;
            state.dates.endDate =
              state.dates.endDate + numberForThreeDays * oneDayMs;
          }
          break;
        case "Неделя":
          {
            state.dates.startDate = state.dates.endDate + oneDayMs;
            state.dates.endDate =
              state.dates.endDate + numberForWeek * oneDayMs;
          }
          break;
        case "Месяц":
          {
            state.dates.startDate = state.dates.endDate + oneDayMs;
            state.dates.endDate = getLastDayofMonthByDate(
              state.dates.endDate + oneDayMs
            );
          }
          break;
        case "Год":
          {
            state.dates.startDate = getYearsDate(
              state.dates.startDate,
              1
            ).start;
            state.dates.endDate = getYearsDate(state.dates.endDate, 1).end;
          }
          break;
      }
    },
  },
});

export const {
  setActiveFilter,
  setDefaultDates,
  setForwardDates,
  setBackDates,
  setCastomDates,
} = filterDateSlice.actions;
export default filterDateSlice.reducer;
