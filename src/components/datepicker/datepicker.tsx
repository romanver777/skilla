import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setBackDates, setForwardDates } from "../../store/filter-date-reducer";
import { TAppDispatch } from "../../store/store";
import * as selectors from "../../store/selectors";

import PopupDp from "../popup-dp/popup-dp";
import Icons from "../icons/icons";

import style from "./datepicker.module.scss";

const Datepicker = () => {
  const dispatch: TAppDispatch = useDispatch();
  const activeFilter = useSelector(selectors.getActiveFilter);
  const list = useSelector(selectors.getFilterDateList);
  const [openDp, setOpenDp] = useState(false);

  const handleBackClick = () => {
    if (activeFilter !== list[list.length - 1]) dispatch(setBackDates());
  };
  const handleForwardClick = () => {
    if (activeFilter !== list[list.length - 1]) dispatch(setForwardDates());
  };

  return (
    <div className={style["dp-wrap"]}>
      <button className={style["btn-left"]} onClick={handleBackClick}>
        <Icons name="arrow" direction="left" />
      </button>
      <div className={style.dp} onClick={() => setOpenDp(!openDp)}>
        <Icons name="dp" />
        <span className={style["dp-name"]}>{activeFilter}</span>
      </div>
      <button className={style["btn-right"]} onClick={handleForwardClick}>
        <Icons name="arrow" direction="right" />
      </button>
      {openDp && <PopupDp onHandleClick={() => setOpenDp(!openDp)} />}
    </div>
  );
};

export default Datepicker;
