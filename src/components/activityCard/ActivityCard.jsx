import React from "react";
import { Card, Typography, Col } from "antd";
import "./activityCard.css";

const ActivityCard = ({ title, description, activityDate, time }) => {
  const { Text } = Typography;
  return (
    <Col xs={24} sm={24} md={12} lg={8} className={"activity-col"}>
      <Card
        classNames={"activity-card"}
        className=""
        size="small"
        title={title}
      >
        <b>
          <span>Tiempo:&nbsp;</span>
        </b>
        <span>{time}</span> <br />
        <b>
          <span>Descripción:&nbsp;</span>
        </b>
        <span>{description}</span> <br />
        <Text type="secondary">{activityDate}</Text>
      </Card>
    </Col>
  );
};

export default ActivityCard;
