import React from "react";
import { notification } from "antd";

const alert = ({message, description, type}) => {

  notification.error({
    message,
    description,
    type
  });
};

export default alert;
