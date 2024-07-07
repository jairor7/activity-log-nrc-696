import { Button, Card, Input } from "antd";
import React, { useContext, useState } from "react";
import { useLocation } from "wouter";
import { LoginContext } from "../../LoginContext";
import "./login.css";
import InputForm from "../../components/inputForm/InputForm";

const Login = () => {
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
    const body = {
      username: username.value,
      password: password.value,
    };

    fetch("/validate-login", {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.isError) {
          setFormData({
            ...formData,
            general: {
              error: response?.response,
            },
          });
        } else {
          setFormData({
            ...formData,
            general: { error: undefined },
          });
          setLoginInfo({
            isLoggedIn: true,
            userInfo: {
              id: response?.response?.id,
              name: response?.response?.name,
              username: username?.response?.value,
              activities: [],
            },
          });
          setLocation("/home");
        }
      })
      .catch((error) => console.error("Error:", error));
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
