import React from "react";
import { Link } from "react-router-dom";

import style from "./sidebar.module.scss";
import routes, { TRoute } from "../../routes/routes";

import logoIcon from "../../style/icons/logo.svg";
import addIcon from "../../style/icons/add.svg";
import payIcon from "../../style/icons/pay.svg";

type TProps = {
  activePage: string;
};

const Sidebar = ({ activePage }: TProps) => {
  const getLinkStyle = (pageName: string) => {
    if (pageName === activePage) {
      return style.link + " " + style["link_active"];
    }
    return style.link;
  };
  const getIconStyle = (pageName: string) => {
    if (pageName === activePage) {
      return style.icon + " " + style["icon_active"];
    }
    return style.icon;
  };

  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
        <Link to="/" className={style["logo-link"]}>
          <img
            src={logoIcon}
            className={style["logo-icon"]}
            width="109"
            height="28"
          />
        </Link>
      </div>
      <nav className={style.nav}>
        <ul className={style.list}>
          {routes.map((item: TRoute) => (
            <li className={style["list-item"]} key={item.name}>
              <Link to={item.path} className={getLinkStyle(item.path)}>
                <div className={style["icon-wrap"]}>
                  <img
                    src={item.iconName}
                    alt={item.iconName}
                    className={getIconStyle(item.path)}
                  />
                </div>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className={style.btns}>
        <button className={style.btn + " " + style["btn-add"]}>
          Добавить заказ
          <img
            src={addIcon}
            alt="Добавить заказ"
            className={style["add-icon"]}
          />
        </button>
        <button className={style.btn + " " + style["btn-pay"]}>
          Оплата
          <img src={payIcon} alt="Оплатить" className={style["pay-icon"]} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
