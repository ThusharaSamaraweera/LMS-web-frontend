import { notification } from "antd";

const Alert = ({message, description, type}) => {

  notification.open({
    message,
    description,
    type,
    placement: "topRight",
    style: {zIndex: 1000}
  });
};

export default Alert;
