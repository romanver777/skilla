import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { TAppDispatch } from "../../store/store";
import * as selectors from "../../store/selectors";
import { resetFilters } from "../../store/filter-calls-reducer";

import Icons from "../icons/icons";
import PopupFilter from "../popup-filter/popup-filter";
import style from "./filters-item.module.scss";

type TProps = {
  name: string;
  list?: string[];
};

const FiltersItem = ({ name, list }: TProps) => {
  const dispatch: TAppDispatch = useDispatch();
  const activeFilter = useSelector(selectors.getFilterCallsByName(name));
  const isDefaultFilter = useSelector(selectors.getIsDefaultFilter(name));
  const [isOpen, setIsOpen] = useState(false);

  const btnStyle = isOpen
    ? style.btn + " " + style["btn_active"]
    : isDefaultFilter
    ? style.btn
    : style.btn + " " + style["btn_active"];

  const onResetFiltersClick = () => {
    dispatch(resetFilters());
    setIsOpen(false);
  };
  const onHandleOpenClick = () => {
    if (list?.length) setIsOpen(!isOpen);
  };

  if (list === undefined)
    return (
      <button className={btnStyle} onClick={onResetFiltersClick}>
        {name}
        <Icons name="cross" />
      </button>
    );

  return (
    <>
      <button className={btnStyle} onClick={onHandleOpenClick}>
        {activeFilter || name}
        {isOpen ? (
          <Icons name="arrow" direction="up" />
        ) : (
          <Icons name="arrow" />
        )}
      </button>
      {isOpen && (
        <PopupFilter
          name={name}
          list={list}
          onHandleClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default FiltersItem;
