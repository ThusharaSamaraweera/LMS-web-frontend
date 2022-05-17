import { useSelector } from "react-redux";

const ProtectedComponent = (props) => {
  const { allowedRoles, children } = props;
  const currentUserRole = useSelector(
    (state) => state.authReducer.authUser.role[0].roleName
  );

  if (allowedRoles.includes(currentUserRole)) {
    return children;
  }
  return null;
};

export default ProtectedComponent;
