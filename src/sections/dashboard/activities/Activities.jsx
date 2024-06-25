import React, { useContext, useEffect } from "react";
import ActivityCard from "../../../components/activityCard/ActivityCard";
import { LoginContext } from "../../../LoginContext";
import { Row } from "antd";

const Activities = () => {
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const { userInfo } = loginInfo;
  useEffect(() => {
    fetch("/activities-by-user?userId=" + userInfo?.id, {
      "method": "get",
    })
    .then((res) => res.json())
    .then((response) => {
      if(!response?.isError){
        setLoginInfo({
          ...loginInfo,
          userInfo: {
            ...loginInfo.userInfo,
            activities: response?.response,
          },
        });
      }
    })
    .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <Row gutter={[16, 16]}>
      {userInfo?.activities?.map((activity) => (
        <ActivityCard
          key={activity.id}
          title={activity.activity}
          description={activity.description}
          activityDate={activity.date.substring(0,10)}
          time={activity.time}
        />
      ))}
    </Row>
  );
};

export default Activities;
