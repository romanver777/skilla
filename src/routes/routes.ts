import results from "../style/icons/results.svg";
import orders from "../style/icons/orders.svg";
import messages from "../style/icons/messages.svg";
import calls from "../style/icons/calls.svg";
import agents from "../style/icons/agents.svg";
import docs from "../style/icons/docs.svg";
import workers from "../style/icons/workers.svg";
import reports from "../style/icons/reports.svg";
import base from "../style/icons/base.svg";
import settings from "../style/icons/settings.svg";

export type TRoute = {
  path: string;
  name: string;
  iconName: string;
};

const routes: TRoute[] = [
  {
    path: "",
    name: "Итоги",
    iconName: results,
  },
  {
    path: "orders",
    name: "Заказы",
    iconName: orders,
  },
  {
    path: "messages",
    name: "Сообщения",
    iconName: messages,
  },
  {
    path: "calls",
    name: "Звонки",
    iconName: calls,
  },
  {
    path: "agents",
    name: "Контрагенты",
    iconName: agents,
  },
  {
    path: "docs",
    name: "Документы",
    iconName: docs,
  },
  {
    path: "workers",
    name: "Исполнители",
    iconName: workers,
  },
  {
    path: "reports",
    name: "Отчеты",
    iconName: reports,
  },
  {
    path: "base",
    name: "База знаний",
    iconName: base,
  },
  {
    path: "settings",
    name: "Настройки",
    iconName: settings,
  },
];

export default routes;
