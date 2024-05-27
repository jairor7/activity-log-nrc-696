import { Button, Card, Input } from "antd";
import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: { value: "", error: undefined },
    password: { value: "", error: undefined },
    general: { error: undefined },
  });

  const users = [
    {
      username: "joiner",
      password: "1234",
    },
    {
      username: "jairo",
      password: "123",
    },
    {
      username: "luisa",
      password: "0987",
    },
  ];

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
    const { username, password } = formData;

    const isValid = users.some(
      (user) =>
        user.username === username.value && user.password === password.value
    );

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
    }
  };

  return (
    <div className="form-container">
      <Card className="form-card" title={"Inicio de sesion"}>
        <form onSubmit={onSubmitForm}>
          <span>Usuario:</span>
          <Input
            id="username"
            onChange={onChangeInput}
            onBlur={onChangeInput}
            value={formData.username.value}
            defaultValue={formData.username.value}
          />
          {formData.username.error && (
            <span className="span-error">{formData.username.error}</span>
          )}
          <span>Contraseña:</span>
          <Input.Password
            id="password"
            onChange={onChangeInput}
            onBlur={onChangeInput}
            value={formData.password.value}
            defaultValue={formData.password.value}
          />
          {formData.password.error && (
            <span className="span-error">{formData.password.error}</span>
          )}
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
