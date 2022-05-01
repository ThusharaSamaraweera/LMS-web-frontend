import { notification } from "antd";

const Alert = ({message, description, type}) => {

  notification.error({
    message,
    description,
    type,
  });
};

export default Alert;
