import React from "react";

import Header from "../header/Header";
import Activities from "../activities/Activities";
import ActivityCreation from "../activityCreaction/ActivityCreation";
import { Tabs } from "antd";

import activities from "../../../assets/activities.json";
import "./home.css";

const Home = () => {
  const items = [
    {
      key: "1",
      label: "Actividades",
      children: <Activities />,
    },
    {
      key: "2",
      label: "Registrar Actividad",
      children: <ActivityCreation />,
    },
  ];

  return (
    <div className="main-container">
      <Header />
      <main>
        <Tabs defaultActiveKey="1" items={items} />
      </main>
    </div>
  );
};

export default Home;
