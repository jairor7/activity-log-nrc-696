import React, { useContext } from "react";
import { LoginContext } from "../../../LoginContext";
import { Button } from "antd";

const Header = () => {
  const { loginInfo } = useContext(LoginContext);
  const { userInfo } = loginInfo;
  return (
    <header>
      <p>{`Hola ${userInfo.name}!`}</p>
      <span>Registra y consulta tus actividades</span>{" "}
      <Button type="link">Cerrar Sessión</Button>
    </header>
  );
};

export default Header;
