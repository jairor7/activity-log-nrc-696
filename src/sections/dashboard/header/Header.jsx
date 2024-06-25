import React, { useContext } from "react";
import { LoginContext, initialContext } from "../../../LoginContext";
import { LogoutOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import { useLocation } from "wouter";

const Header = () => {
  const { Title } = Typography;
  const { loginInfo, setLoginInfo } = useContext(LoginContext);
  const { userInfo } = loginInfo;
  const [, navigate] = useLocation();
  const onClickLogout = () => {
    setLoginInfo(initialContext);
    navigate("/login");
  };

  return (
    <header>
      <Title style={{ margin: 0 }}>{`Hola ${userInfo?.name}!`}</Title>
      <span>Registra y consulta tus actividades o</span>
      <Button
        style={{ padding: "0 0.5rem", fontSize: "1.6rem" }}
        onClick={onClickLogout}
        icon={<LogoutOutlined />}
        iconPosition={"end"}
        type="link"
      >
        cierra sesión
      </Button>
    </header>
  );
};

export default Header;
