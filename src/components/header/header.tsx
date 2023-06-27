import React from "react";

import Icons from "../icons/icons";

import { getFormatDateForHeader } from "../../utils/utils";
import avatarImg from "../../style/icons/avatar.png";
import style from "./header.module.scss";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.container}>
        <div className={style.analitics}>
          <div className={style.date}>{getFormatDateForHeader(new Date())}</div>
          <div className={style["call-tracks"]}>
            <div className={style["call-track"]}>
              <div className={style["track-name"]}>
                Новые звонки
                <span className={style["track-name_green"]}>
                  &nbsp;20 из 30шт
                </span>
              </div>
              <div className={style.bar}>
                <div className={style["bar-base"]}></div>
                <div
                  className={
                    style["bar-progress"] + " " + style["bar-progress_green"]
                  }
                ></div>
              </div>
            </div>
            <div className={style["call-track"]}>
              <div className={style["track-name"]}>
                Качество разговоров
                <span className={style["track-name_yellow"]}>&nbsp;40%</span>
              </div>
              <div className={style.bar}>
                <div className={style["bar-base"]}></div>
                <div
                  className={
                    style["bar-progress"] + " " + style["bar-progress_yellow"]
                  }
                ></div>
              </div>
            </div>
            <div className={style["call-track"]}>
              <div className={style["track-name"]}>
                Конверсия в заказ
                <span className={style["track-name_red"]}>&nbsp;67%</span>
              </div>
              <div className={style.bar}>
                <div className={style["bar-base"]}></div>
                <div
                  className={
                    style["bar-progress"] + " " + style["bar-progress_red"]
                  }
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.user}>
          <div className={style.search}>
            <Icons name="search" />
          </div>
          <div className={style.company}>
            <div className={style["company-name"]}>
              ИП Сидорова Александра Михайловна
            </div>
            <Icons name="arrowDown" />
          </div>
          <div className={style.avatars}>
            <img src={avatarImg} alt="avatar" className={style.avatar} />
            <Icons name="arrowDown" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
