import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Sidebar from "../sidebar/sidebar";
import Header from "../header/header";
import PageCalls from "../page-calls/page-calls";

import style from "./app.module.scss";

const App = () => {
  const { pathname } = useLocation();

  return (
    <div className={style.wrapper}>
      <Header />
      <main className={style.main}>
        <Routes>
          <Route path="/calls" element={<PageCalls />} />
          <Route path="*" element={<Navigate to="/calls" replace />} />
        </Routes>
      </main>
      <Sidebar activePage={pathname.slice(1)} />
    </div>
  );
};

export default App;
