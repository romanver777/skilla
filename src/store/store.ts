import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import fetchCallsReducer from "./fetch-calls-reducer";
import filterDateReducer from "./filter-date-reducer";
import filterCallsReducer from "./filter-calls-reducer";

export const store = configureStore({
  reducer: {
    calls: fetchCallsReducer,
    filterDate: filterDateReducer,
    filtersCalls: filterCallsReducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<TAppDispatch>();
