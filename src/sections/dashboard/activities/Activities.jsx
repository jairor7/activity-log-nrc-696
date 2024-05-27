import React, { useContext } from "react";
import ActivityCard from "../../../components/activityCard/ActivityCard";
import { LoginContext } from "../../../LoginContext";
import { Row } from "antd";

const Activities = () => {
  const { loginInfo } = useContext(LoginContext);
  const { userInfo } = loginInfo;
  return (
    <Row gutter={[16, 16]}>
      {userInfo?.activities?.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.activity}
          description={activity.description}
          activityDate={activity.date}
          time={activity.time}
        />
      ))}
    </Row>
  );
};

export default Activities;
