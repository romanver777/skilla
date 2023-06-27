import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { useAppDispatch, TRootState, TAppDispatch } from "../../store/store";
import { fetchCalls } from "../../store/fetch-calls-reducer";
import * as selectors from "../../store/selectors";

import Loader from "../loader/loader";
import Message from "../message/message";
import CallsHead from "../calls-head/calls-head";
import CallsDate from "../calls-date/calls-date";
import Checkbox from "../checkbox/checkbox";
import Player from "../player/player";

import {
  getDateForFetch,
  getFormatCalls,
  getTimeFromFullDate,
  getTimeInMin,
} from "../../utils/utils";
import { TCall } from "../../types/calls-types";

import Icons from "../icons/icons";
import siteIcon from "../../style/icons/site.svg";
import phoneIcon from "../../style/icons/phone.svg";
import style from "./calls.module.scss";

const Calls = () => {
  const dispatch: TAppDispatch = useAppDispatch();
  const dates = useSelector((state: TRootState) => state.filterDate.dates);
  const calls = useSelector((state: TRootState) => state.calls.calls.results);
  const loading = useSelector((state: TRootState) => state.calls.loading);
  const error = useSelector((state: TRootState) => state.calls.error);

  const activeFilterType = useSelector(
    selectors.getFilterCallsByName("Все типы")
  );

  const [filteredCalls, setFilteredCalls] = useState<TCall[]>([]);
  const [checked, setChecked] = useState<number[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>();
  const [listHovered, setListHovered] = useState(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const isChecked = (id: number) => !!checked.find((item) => item === id);
  const isHovered = (id: number) => hoveredId === id;

  useEffect(() => {
    void dispatch(fetchCalls(dates));
    if (filteredCalls.length) setFilteredCalls([]);
    if (checked.length) setChecked([]);
    if (listHovered) setListHovered(false);
  }, [dates]);

  useEffect(() => {
    if (calls.length) {
      switch (activeFilterType) {
        case "Входящие звонки":
          setFilteredCalls(calls.filter((call) => call.in_out === 1));
          break;
        case "Исходящие звонки":
          setFilteredCalls(calls.filter((call) => call.in_out === 0));
          break;
        default:
          setFilteredCalls(calls);
      }
    }
  }, [calls, activeFilterType]);

  const handleCheckboxClick = (id?: number) => {
    if (id) {
      if (isChecked(id)) {
        setChecked(checked.filter((item) => item !== id));
      } else {
        setChecked([...checked, id]);
      }
    }
  };
  const onHandleHeadCheckboxClick = () => {
    if (checked.length !== calls.length) {
      setChecked(calls.map((call) => call.id));
    } else {
      setChecked([]);
    }
  };

  const handleListHover = () => {
    setListHovered(!listHovered);
  };

  if (error) return error;

  return (
    <div className={style.calls}>
      <div
        className={style.list}
        onMouseEnter={handleListHover}
        onMouseLeave={handleListHover}
      >
        <div className={`${style["list-item"]} ${style["list-item-head"]}`}>
          <CallsHead
            onHandleCheckboxClick={onHandleHeadCheckboxClick}
            isChecked={!!calls.length && checked.length === calls.length}
            isHovered={listHovered}
          />
        </div>
        {loading && <Loader />}
        {!calls.length && !loading ? (
          <Message text="Данные не найдены" />
        ) : (
          <div className={`${style["list-item"]} ${style["list-item-body"]}`}>
            {getFormatCalls(filteredCalls).map((item) => {
              return (
                <ul key={item.date} className={style["list-day"]}>
                  {item.date !== getDateForFetch(Date.now()) && (
                    <li
                      key={item.date}
                      className={`${style["list-day-item"]} ${style["list-day-item-date"]}`}
                    >
                      <CallsDate date={item.date} length={item.calls.length} />
                    </li>
                  )}
                  {item.calls.map((call, ind) => (
                    <li
                      key={call.id}
                      className={`${style["list-day-item"]} ${
                        item.calls.length - 1 === ind ? style["last-child"] : ""
                      }`}
                      onMouseEnter={() => setHoveredId(call.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <ul
                        className={`${style["calls-list"]}
                        ${isChecked(call.id) ? style.ulChecked : ""}
                        `}
                      >
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-cb"]}
                        `}
                        >
                          {(isChecked(call.id) || isHovered(call.id)) && (
                            <Checkbox
                              id={call.id}
                              onCheckboxClick={handleCheckboxClick}
                              isChecked={isChecked(call.id)}
                            />
                          )}
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-type"]}`}
                        >
                          {call.in_out ? (
                            call.status === "Дозвонился" ? (
                              <Icons name="in_out" direction="in_ok" />
                            ) : (
                              <Icons name="in_out" direction="in_err" />
                            )
                          ) : call.status === "Дозвонился" ? (
                            <Icons name="in_out" direction="out_ok" />
                          ) : (
                            <Icons name="in_out" direction="out_err" />
                          )}
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-time"]}`}
                        >
                          {getTimeFromFullDate(call.date)}
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-ava"]}`}
                        >
                          <div className={style["ava-wrap"]}>
                            <img
                              src={call.person_avatar}
                              alt="Аватар сотрудника"
                              className={style.ava}
                            />
                          </div>
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-phone"]}`}
                        >
                          {call.from_site ? (
                            <img
                              src={siteIcon}
                              alt="Звонок с сайта"
                              className={style.siteIcon}
                            />
                          ) : (
                            ""
                          )}
                          {(isChecked(call.id) || isHovered(call.id)) && (
                            <img
                              src={phoneIcon}
                              alt="Телефон"
                              className={style.phoneIcon}
                            />
                          )}
                          {/* {isChecked(call.id) ? (
                            <img
                              src={phoneIcon}
                              alt="Телефон"
                              className={style.phoneIcon}
                            />
                          ) : isHovered(call.id) ? (
                            <img
                              src={phoneIcon}
                              alt="Телефон"
                              className={style.phoneIcon}
                            />
                          ) : (
                            ""
                          )} */}
                          <span className={style.contact_name}>
                            {call.contact_name}
                          </span>
                          {call.contact_company ? (
                            ""
                          ) : (
                            <span
                              className={
                                call.contact_name ? style.numberN : style.number
                              }
                            >
                              {call.in_out ? call.from_number : call.to_number}
                            </span>
                          )}
                          <span className={style.contact_company}>
                            {call.contact_company}
                          </span>
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-source"]}`}
                        >
                          {call.source}
                        </li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-rating"]}`}
                        ></li>
                        <li
                          className={`${style["calls-list-item"]} ${style["calls-list-item-durat"]}`}
                        >
                          <div
                            className={`${style.playerWrap} ${
                              isChecked(call.id) ? style.display : ""
                            }`}
                          >
                            {call.time ? (
                              <Player
                                call={call}
                                isHovered={isHovered(call.id)}
                                isChecked={isChecked(call.id)}
                                activeId={activeId}
                                setActiveId={(id) => setActiveId(id)}
                              />
                            ) : (
                              getTimeInMin(call.time)
                            )}
                          </div>
                          <div className={style.duratTime}>
                            {isChecked(call.id) ? "" : getTimeInMin(call.time)}
                          </div>
                        </li>
                      </ul>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calls;
