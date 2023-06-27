import React from "react";

import Checkbox from "../checkbox/checkbox";
import style from "./calls-head.module.scss";

type TProps = {
  onHandleCheckboxClick: () => void;
  isChecked: boolean;
  isHovered: boolean;
};

const CallsHead = ({ onHandleCheckboxClick, isChecked, isHovered }: TProps) => {
  return (
    <ul className={style["head-list"]}>
      <li
        className={`${style["head-item"]} ${style["head-item-cb"]}
      ${isHovered ? style["head-item-cb_hovered"] : ""}
      ${isChecked ? style["head-item-cb_checked"] : ""}`}
      >
        <div className={style.checkB}>
          {isChecked ? (
            <Checkbox
              onCheckboxClick={() => onHandleCheckboxClick()}
              isChecked={isChecked}
            />
          ) : isHovered ? (
            <Checkbox
              onCheckboxClick={() => onHandleCheckboxClick()}
              isChecked={isChecked}
            />
          ) : (
            ""
          )}
        </div>
      </li>
      <li className={style["head-item"] + " " + style["head-item-type"]}>
        Тип
      </li>
      <li className={style["head-item"] + " " + style["head-item-time"]}>
        Время
      </li>
      <li className={style["head-item"] + " " + style["head-item-ava"]}>
        Сотрудник
      </li>
      <li className={style["head-item"] + " " + style["head-item-phone"]}>
        Звонок
      </li>
      <li className={style["head-item"] + " " + style["head-item-source"]}>
        Источник
      </li>
      <li className={style["head-item"] + " " + style["head-item-rating"]}>
        Оценка
      </li>
      <li className={style["head-item"] + " " + style["head-item-durat"]}>
        Длительность
      </li>
    </ul>
  );
};

export default CallsHead;
