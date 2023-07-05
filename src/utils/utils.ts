import { TFilterCalls, TCall } from "../types/calls-types";

export const addZero = (str: string) => {
  if (str.length < 2) return "0" + str;
  return str;
};

export const getFormatDateForHeader = (date: Date) => {
  const str = date.toLocaleString("default", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  return str[0].toUpperCase() + str.slice(1);
};

export const getFormatDateForTable = (date: string) => {
  const newDate = new Date(date);
  const str = newDate.toLocaleString("default", {
    day: "numeric",
    month: "long",
  });
  return str[0].toUpperCase() + str.slice(1);
};

export const getDateForView = (date: number) => {
  const day = String(new Date(date).getDate());
  const month = String(new Date(date).getMonth() + 1);
  const year = String(new Date(date).getFullYear()).slice(2);

  return `${addZero(day)}.${addZero(month)}.${year}`;
};

export const getDateForFetch = (date: number): string => {
  const day = String(new Date(date).getDate());
  const month = String(new Date(date).getMonth() + 1);
  const year = new Date(date).getFullYear();

  return `${year}-${addZero(month)}-${addZero(day)}`;
};

export const getYesterdayDate = (date: number) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const yesterday = date - oneDayMs;

  const day = String(new Date(yesterday).getDate());
  const month = String(new Date(yesterday).getMonth() + 1);
  const year = new Date(yesterday).getFullYear();

  return `${year}-${addZero(month)}-${addZero(day)}`;
};

export const getDefaultThreeDaysDates = (date: number) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  const numberDays = 2;

  return {
    start: date - numberDays * oneDayMs,
    end: date,
  };
};

export const getDefaultWeekDates = (date: number) => {
  const oneDayMs = 24 * 60 * 60 * 1000;
  let day = new Date(date).getDay();
  if (!day) day = 7;
  const toEndWeek = 7 - day;
  const toStartWeek = day - 1;

  return {
    start: date - toStartWeek * oneDayMs,
    end: date + toEndWeek * oneDayMs,
  };
};

export const getDefaultMonthDates = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const startDay = "01";
  const endDay = new Date(year, month, 0).getDate();

  return {
    start: new Date(`${year}-${month}-${startDay}`).getTime(),
    end: new Date(`${year}-${month}-${endDay}`).getTime(),
  };
};

export const getDefaultYearsDates = (date: number) => {
  const startMonth = "01";
  const endMonth = "12";
  const year = new Date(date).getFullYear();
  const startDay = "01";
  const endDay = new Date(year, 12, 0).getDate();

  return {
    start: new Date(`${year}-${startMonth}-${startDay}`).getTime(),
    end: new Date(`${year}-${endMonth}-${endDay}`).getTime(),
  };
};

export const getFirstDayofMonthByDate = (date: number) => {
  const day = "01";
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return new Date(`${year}-${month}-${day}`).getTime();
};

export const getLastDayofMonthByDate = (date: number) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();
  const endDay = new Date(year, month, 0).getDate();

  return new Date(`${year}-${month}-${endDay}`).getTime();
};

export const getYearsDate = (date: number, oneYear: number) => {
  const startDay = "01";
  const endDay = "31";
  const startMonth = "01";
  const endMonth = "12";
  const year = new Date(date).getFullYear() + oneYear;

  return {
    start: new Date(`${year}-${startMonth}-${startDay}`).getTime(),
    end: new Date(`${year}-${endMonth}-${endDay}`).getTime(),
  };
};

export const getTimeFromFullDate = (date: Date) => {
  const time = String(date).split(" ")[1].split(":");

  return time[0] + ":" + time[1];
};

export const getFormatCalls = (calls: TCall[]) => {
  const dates = new Set<string>();
  calls.forEach((call) => dates.add(call.date_notime));

  const result: TFilterCalls[] = [];

  Array.from(dates).map((el: string) => {
    const obj: TFilterCalls = {
      date: "",
      calls: [],
    };
    obj.calls = calls.filter((call: TCall) => call.date_notime === el);
    obj.date = el;

    result.push(obj);
  });
  return result;
};

export const getTimeInMin = (sec: number) => {
  if (!sec) return 0;

  const min = Math.floor(sec / 60);
  const secs = min > 0 ? sec - min * 60 : sec;

  return `${min}:${addZero(String(secs))}`;
};
