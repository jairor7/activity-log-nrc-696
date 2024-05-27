import React from "react";
import Header from "../header/Header";
import Activities from "../activities/Activities";
import ActivityCreation from "../activityCreaction/ActivityCreation";
import "./home.css";
import { Tabs } from "antd";

const Home = () => {
  const items = [
    {
      key: "1",
      label: "Actividades",
      children: <Activities />,
    },
    {
      key: "2",
      label: "Crear Actividad",
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
