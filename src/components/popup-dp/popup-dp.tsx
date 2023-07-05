import React, { useState, useEffect } from "react";
import InputMask from "react-input-mask";

import { useDispatch, useSelector } from "react-redux";
import {
  setActiveFilter,
  setDefaultDates,
  setCastomDates,
} from "../../store/filter-date-reducer";
import { resetPageNumber } from "../../store/fetch-calls-reducer";
import * as selectors from "../../store/selectors";

import Icons from "../icons/icons";
import { getDateForView } from "../../utils/utils";
import style from "./popup-dp.module.scss";

type TProps = {
  onHandleClick: () => void;
};

const PopupDp = ({ onHandleClick }: TProps) => {
  const dispatch = useDispatch();
  const list = useSelector(selectors.getFilterDateList);
  const activeFilter = useSelector(selectors.getActiveFilter);
  const sDate = useSelector(selectors.getStartDate);
  const eDate = useSelector(selectors.getEndDate);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (activeFilter === list[list.length - 1]) {
      setStartDate(getDateForView(sDate));
      setEndDate(getDateForView(eDate));
    }
    dispatch(resetPageNumber());
  }, [activeFilter]);

  const onHandleDateClick = () => {
    if (isValid(startDate.split(".")) && isValid(endDate.split("."))) {
      dispatch(setActiveFilter(list[list.length - 1]));
      dispatch(setCastomDates({ startDate, endDate }));
      onHandleClick();
    }
  };

  const onFilterClick = (item: string) => {
    if (item !== activeFilter) {
      dispatch(setActiveFilter(item));
    }
    dispatch(setDefaultDates(item));
    onHandleClick();
  };

  return (
    <div className={style["dp-panel"]}>
      <ul className={style["dp-panel__list"]}>
        {list.slice(0, -1).map((item) => {
          const styleItem =
            item === activeFilter
              ? style["dp-panel__list-item"] +
                " " +
                style["dp-panel__list-item_active"]
              : style["dp-panel__list-item"];

          return (
            <li
              key={item}
              className={styleItem}
              onClick={() => onFilterClick(item)}
            >
              {item}
            </li>
          );
        })}
      </ul>
      <div className={style.range}>
        <div className={style["range-title"]}>Указать даты</div>
        <div className={style["range-date"]}>
          <InputMask
            mask="99.99.99"
            placeholder="__.__.__"
            className={style.input + " " + style["inp-startDate"]}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>-</span>
          <InputMask
            mask="99.99.99"
            placeholder="__.__.__"
            className={style.input + " " + style["inp-endDate"]}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button className={style["inp-btn"]} onClick={onHandleDateClick}>
            <Icons name="dp" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDp;

const validateDay = (day: number) => !isNaN(day) && day > 0 && day < 32;
const validateMonth = (month: number) =>
  !isNaN(month) && month > 0 && month < 13;
const validateYear = (year: number) => !isNaN(year);
const isValid = (date: string[]) =>
  validateDay(+date[0]) && validateMonth(+date[1]) && validateYear(+date[2]);
