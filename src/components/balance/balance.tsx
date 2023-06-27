import React from "react";

import Icons from "../icons/icons";
import style from "./balance.module.scss";

const Balance = () => {
  return (
    <button className={style.balance}>
      Баланс: <span className={style.price}>272 &#8381;</span>
      <Icons name="add" />
    </button>
  );
};

export default Balance;
