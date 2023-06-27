import { createSelector } from "@reduxjs/toolkit";

import { TRootState } from "./store";

export const getFilterDateList = (state: TRootState) => state.filterDate.list;

export const getActiveFilter = (state: TRootState) =>
  state.filterDate.activeFilter;

export const getStartDate = (state: TRootState) =>
  state.filterDate.dates.startDate;

export const getEndDate = (state: TRootState) => state.filterDate.dates.endDate;

export const getAllFiltersCalls = (state: TRootState) => state.filtersCalls;

export const getFilterCallsByName = (name: string) =>
  createSelector(getAllFiltersCalls, (items) => {
    switch (name) {
      case "Все типы":
        return items.filterTypes.activeFilter;
      case "Все сотрудники":
        return items.filterStaff.activeFilter;
    }
  });

export const getIsDefaultFilter = (name: string) =>
  createSelector(getAllFiltersCalls, (items) => {
    switch (name) {
      case "Все типы":
        return items.filterTypes.activeFilter === items.filterTypes.name;
      case "Все сотрудники":
        return items.filterStaff.activeFilter === items.filterStaff.name;
      default:
        return true;
    }
  });
