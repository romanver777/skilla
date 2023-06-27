import React from "react";

import { getYesterdayDate, getFormatDateForTable } from "../../utils/utils";
import style from "./calls-date.module.scss";

type TProps = {
  date: string;
  length: number;
};

const CallsDate = ({ date, length }: TProps) => {
  return (
    <>
      <span className={style.date}>
        {date === getYesterdayDate(Date.now())
          ? "вчера"
          : getFormatDateForTable(date)}
      </span>
      <span className={style.length}>{length}</span>
    </>
  );
};

export default CallsDate;
