import React from "react";

import style from "./checkbox.module.scss";

type TProps = {
  id?: number;
  onCheckboxClick: (id?: number) => void;
  isChecked: boolean;
};

const Checkbox = ({ id, onCheckboxClick, isChecked }: TProps) => {
  const handleClick = () => {
    id ? onCheckboxClick(id) : onCheckboxClick();
  };

  return (
    <div className={`${style.cb}`}>
      <label
        htmlFor={id ? String(id) : "checkbox-head"}
        className={`${style.label} ${isChecked ? style["label_active"] : ""}`}
      ></label>
      <input
        type="checkbox"
        className={style.checkbox}
        id={id ? String(id) : "checkbox-head"}
        onChange={handleClick}
      />
    </div>
  );
};

export default Checkbox;
