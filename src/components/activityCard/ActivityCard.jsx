import React from "react";
import { Card, Typography } from "antd";
const { Text } = Typography;

const ActivityCard = ({ title, description, activityDate }) => {
  return (
    <Card
      size="small"
      title={title}
      style={{
        width: 300,
      }}
    >
      <b>
        <span>Descripción:</span>
      </b>
      <span>{description}</span> <br />
      <Text type="secondary">{activityDate}</Text>
    </Card>
  );
};

export default ActivityCard;
