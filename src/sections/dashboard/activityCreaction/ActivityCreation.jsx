import { Button, Input } from "antd";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../../LoginContext";
import InputForm from "../../../components/inputForm/InputForm";
import "./activityCreation.css";

const ActivityCreation = () => {
  const initialStateForm = {
    activity: { value: "", error: undefined },
    description: { value: "", error: undefined },
    time: { value: "", error: undefined },
    date: { value: "", valueObject: null },
    general: { error: undefined, success: undefined },
  };
  const [formData, setFormData] = useState(initialStateForm);

  const { loginInfo, setLoginInfo } = useContext(LoginContext);

  const onSubmitForm = (event) => {
    event.preventDefault();
    const isNotEmpty = (prop) => prop?.value?.length > 0;
    const { activity, description, time, date } = formData;
    const formIsComplete =
      isNotEmpty(activity) &&
      isNotEmpty(description) &&
      isNotEmpty(time) &&
      isNotEmpty(date);

    if (formIsComplete) {
      const newActivity = {
        activity: activity.value,
        description: description.value,
        date: time.value,
        time: date.value,
      };

      setLoginInfo({
        ...loginInfo,
        userInfo: {
          ...loginInfo.userInfo,
          activities: [...loginInfo.userInfo.activities, newActivity],
        },
      });
      setFormData({
        ...initialStateForm,
        general: {
          error: undefined,
          success: "Actividad registrada con exito",
        },
      });
    } else {
      setFormData({
        ...formData,
        general: {
          error: "Por favor, complete todos los campos",
        },
      });
    }
  };

  const onChangeDate = (date, dateString) => {
    let newInput = { value: dateString, valueObject: date };
    setFormData({
      ...formData,
      date: newInput,
      general: initialStateForm.general,
    });
  };

  const onChangeInput = ({ target }) => {
    const { id, value } = target;
    const VALUE_MAXIMUM = 25;
    const VALUE_MAXIMUM_DESCRIPTION = 50;
    let newInput = { value: "", error: "" };
    if (
      value?.length >= 0 &&
      value?.length <= VALUE_MAXIMUM_DESCRIPTION &&
      id === "description"
    ) {
      newInput = { value: value, error: undefined };
    } else if (value?.length >= 0 && value?.length <= VALUE_MAXIMUM) {
      newInput = { value: value, error: undefined };
    } else {
      newInput = {
        value: formData?.[id]?.value,
        error: `El campo supera el máximo letras permitidas.`,
      };
    }
    setFormData({
      ...formData,
      [id]: newInput,
      general: initialStateForm.general,
    });
  };

  return (
    <div className="activity-form-container">
      <form onSubmit={onSubmitForm}>
        <InputForm
          id={"activity"}
          label={"Nombre de la actividad"}
          onChangeInput={onChangeInput}
          onBlurInput={onChangeInput}
          value={formData.activity.value}
          error={formData.activity.error}
        />
        <InputForm
          id={"description"}
          label={"Descripción"}
          onChangeInput={onChangeInput}
          onBlurInput={onChangeInput}
          value={formData.description.value}
          error={formData.description.error}
        />
        <InputForm
          id={"time"}
          label={"Tiempo"}
          onChangeInput={onChangeInput}
          onBlurInput={onChangeInput}
          value={formData.time.value}
          error={formData.time.error}
        />
        <InputForm
          id={"date"}
          label={"Fecha"}
          onChangeInput={onChangeDate}
          value={formData.date.valueObject}
          isDate
        />
        {formData.general.error && (
          <span className="span-error">{formData.general.error}</span>
        )}
        {formData.general.success && (
          <span className="span-success">{formData.general.success}</span>
        )}
        <Button
          className="activity-create-button"
          htmlType="submit"
          type="primary"
          block
        >
          Registrar actividad
        </Button>
      </form>
    </div>
  );
};

export default ActivityCreation;
