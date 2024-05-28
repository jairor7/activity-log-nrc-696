import { Button, Card, Input } from "antd";
import React, { useContext, useState } from "react";
import { useLocation } from "wouter";
import { LoginContext } from "../../LoginContext";
import usersApp from "../../assets/users.json";
import "./login.css";
import InputForm from "../../components/inputForm/InputForm";

const Login = () => {
  const { users } = usersApp;
  const [formData, setFormData] = useState({
    username: { value: "", error: undefined },
    password: { value: "", error: undefined },
    general: { error: undefined },
  });
  const [, setLocation] = useLocation();
  const { setLoginInfo } = useContext(LoginContext);

  const onChangeInput = ({ target }) => {
    const { id, value } = target;
    const VALUE_MAXIMUM = 25;
    let newInput = { value: "", error: "" };
    if (value?.length >= 0 && value?.length <= VALUE_MAXIMUM) {
      newInput = { value: value, error: undefined };
    } else {
      newInput = {
        value: formData?.[id]?.value,
        error: `El campo ${
          id === "username" ? "usuario" : "contraseña"
        } admite máximo ${VALUE_MAXIMUM} letras.`,
      };
    }
    setFormData({ ...formData, [id]: newInput });
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    let name = "";
    const { username, password } = formData;

    const isValid = users.some((user) => {
      const isValid =
        user.username === username.value && user.password === password.value;
      isValid && (name = user.name);
      return isValid;
    });

    setFormData({
      ...formData,
      general: {
        error: isValid ? undefined : "El usuario y/o contraseña es incorrecta",
      },
    });

    if (isValid) {
      setFormData({
        ...formData,
        general: { error: undefined },
      });
      setLoginInfo({
        isLoggedIn: isValid,
        userInfo: {
          name: name,
          username: username.value,
          activities: [],
        },
      });
      setLocation("/home");
    }
  };

  return (
    <div className="form-container">
      <Card className="form-card" title={"Inicio de sesion"}>
        <form onSubmit={onSubmitForm}>
          <InputForm
            id={"username"}
            label={"Usuario"}
            onChangeInput={onChangeInput}
            onBlurInput={onChangeInput}
            value={formData.username.value}
            error={formData.username.error}
          />
          <InputForm
            id={"password"}
            label={"Contraseña"}
            onChangeInput={onChangeInput}
            onBlurInput={onChangeInput}
            value={formData.password.value}
            error={formData.password.error}
            isPassword
          />
          {formData.general.error && (
            <span className="span-error">{formData.general.error}</span>
          )}
          <Button type="primary" htmlType="submit" block>
            Iniciar sesión
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Login;
