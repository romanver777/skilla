import React from "react";

import style from "./icons.module.scss";

type TProps = {
  name: string;
  direction?: string;
};

const Icons = ({ name, direction }: TProps) => {
  const getStyle = (name: string) => {
    if (name === "download") {
      if (direction === "added") return style.downAdded;
    }
    if (name === "arrow") {
      switch (direction) {
        case "up":
          return style.arrowUp;
        case "down":
          return style.arrowDown;
        case "left":
          return style.arrowLeft;
        case "right":
          return style.arrowRight;
      }
    }
    if (name === "in_out") {
      switch (direction) {
        case "in_ok":
          return style.inOk;
        case "in_err":
          return style.inErr;
        case "out_ok":
          return style.outOk;
        case "out_err":
          return style.outErr;
      }
    }
  };

  if (name === "close")
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_60_3753)">
          <path
            className={getStyle(name)}
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill="#002CFB"
          />
        </g>
        <defs>
          <clipPath id="clip0_60_3753">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );

  if (name === "download")
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={getStyle(name)}
          d="M6 20H19V18.1176H6V20ZM19 9.64706H15.2857V4H9.71429V9.64706H6L12.5 16.2353L19 9.64706Z"
          fill="#ADBFDF"
        />
      </svg>
    );

  if (name === "cross")
    return (
      <svg
        className={style.cross}
        width="9"
        height="9"
        viewBox="0 0 9 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.875 1.00625L7.99375 0.125L4.5 3.61875L1.00625 0.125L0.125 1.00625L3.61875 4.5L0.125 7.99375L1.00625 8.875L4.5 5.38125L7.99375 8.875L8.875 7.99375L5.38125 4.5L8.875 1.00625Z"
          fill="#002CFB"
        />
      </svg>
    );

  if (name === "in_out")
    return (
      <svg
        className={getStyle(name)}
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z"
          fill="#002CFB"
        />
      </svg>
    );

  if (name === "dp")
    return (
      <svg
        width="16"
        height="18"
        viewBox="0 0 16 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={style.dp}
          d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 16.3636H1.6V5.72727H14.4V16.3636Z"
        />
      </svg>
    );
  if (name === "add")
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className={getStyle(name)}
          d="M12 0C5.376 0 0 5.376 0 12C0 18.624 5.376 24 12 24C18.624 24 24 18.624 24 12C24 5.376 18.624 0 12 0ZM18 13.2H13.2V18H10.8V13.2H6V10.8H10.8V6H13.2V10.8H18V13.2Z"
        />
      </svg>
    );
  if (name === "search")
    return (
      <button className={style.btn}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className={style.search}
            d="M11.4351 10.0629H10.7124L10.4563 9.81589C11.3528 8.77301 11.8925 7.4191 11.8925 5.94625C11.8925 2.66209 9.23042 0 5.94625 0C2.66209 0 0 2.66209 0 5.94625C0 9.23042 2.66209 11.8925 5.94625 11.8925C7.4191 11.8925 8.77301 11.3528 9.81589 10.4563L10.0629 10.7124V11.4351L14.6369 16L16 14.6369L11.4351 10.0629ZM5.94625 10.0629C3.66838 10.0629 1.82962 8.22413 1.82962 5.94625C1.82962 3.66838 3.66838 1.82962 5.94625 1.82962C8.22413 1.82962 10.0629 3.66838 10.0629 5.94625C10.0629 8.22413 8.22413 10.0629 5.94625 10.0629Z"
          />
        </svg>
      </button>
    );

  return (
    <svg
      className={getStyle(name)}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
    >
      <g clipPath="url(#a)">
        <path
          d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z"
          opacity=".8"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h24v24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Icons;
