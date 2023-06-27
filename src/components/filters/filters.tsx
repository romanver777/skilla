import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import * as selectors from "../../store/selectors";

import FiltersItem from "../filters-item/filters-item";

import Icons from "../icons/icons";
import style from "./filters.module.scss";

const Filters = () => {
  const isDefaultFilterTypes = useSelector(
    selectors.getIsDefaultFilter("Все типы")
  );
  const isDefaultFilterStaff = useSelector(
    selectors.getIsDefaultFilter("Все сотрудники")
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDefaultFilterTypes && isDefaultFilterStaff) {
      if (isOpen) setIsOpen(false);
    } else {
      if (!isOpen) setIsOpen(true);
    }
  }, [isDefaultFilterTypes, isDefaultFilterStaff]);

  return (
    <div className={style.fwrap}>
      <div className={style.search}>
        <Icons name="search" />
        <input
          type="tel"
          placeholder="Поиск по звонкам"
          className={style["search-input"]}
        />
      </div>
      <div className={style.filters}>
        <ul className={style["filters-list"]}>
          {isOpen && (
            <li className={style["filters-items"]}>
              <FiltersItem name="Сбросить фильтры" />
            </li>
          )}
          <li className={style["filters-items"]}>
            <FiltersItem name="Все типы" list={allCallsList} />
          </li>
          <li className={style["filters-items"]}>
            <FiltersItem
              name="Все сотрудники"
              list={["Все сотрудники", "Сотрудник 1", "Сотрудник 2"]}
            />
          </li>
          <li className={style["filters-items"]}>
            <FiltersItem name="Все звонки" list={[]} />
          </li>
          <li className={style["filters-items"]}>
            <FiltersItem name="Все источники" list={[]} />
          </li>
          <li className={style["filters-items"]}>
            <FiltersItem name="Все оценки" list={[]} />
          </li>
          <li className={style["filters-items"]}>
            <FiltersItem name="Все ошибки" list={[]} />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filters;

const allCallsList = ["Все типы", "Входящие звонки", "Исходящие звонки"];
