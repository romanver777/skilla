import React from "react";

import spinnerIcon from "../../style/icons/spinner.svg";
import style from "./loader.module.scss";

type TProps = {
  bottom?: boolean;
};

const Loader = ({ bottom }: TProps) => {
  return (
    <div
      className={`${style.container} ${
        bottom ? style["container_bottom"] : ""
      }`}
    >
      <img
        src={spinnerIcon}
        alt="Загружаем"
        className={style.spinner + " " + style["spinner_animate"]}
      />
      <span className={style.text}>Загружаем</span>
    </div>
  );
};

export default Loader;
