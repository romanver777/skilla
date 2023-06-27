import React from "react";

import Balance from "../balance/balance";
import Datepicker from "../datepicker/datepicker";
import Filters from "../filters/filters";
import Calls from "../calls/calls";

import style from "./page-calls.module.scss";

const PageCalls = () => {
  return (
    <div className={style.content}>
      <div className={style.fpanel}>
        <div className={style.btns}>
          <Balance />
          <Datepicker />
        </div>
        <Filters />
      </div>
      <Calls />
    </div>
  );
};

export default PageCalls;
