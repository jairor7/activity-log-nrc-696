import React, { useContext, useEffect } from "react";

import Header from "../header/Header";
import Activities from "../activities/Activities";
import ActivityCreation from "../activityCreaction/ActivityCreation";
import { LoginContext } from "../../../LoginContext";
import { Tabs } from "antd";

import activities from "../../../assets/activities.json";
import "./home.css";

const Home = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const { userInfo } = loginInfo;
  const activitiesUser = activities[userInfo?.username];

  useEffect(() => {
    setLoginInfo({
      ...loginInfo,
      userInfo: {
        ...loginInfo.userInfo,
        activities: activitiesUser,
      },
    });
  }, []);

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
