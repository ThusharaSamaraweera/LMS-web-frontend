import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserApp from "./views/UserApp";
import PublicApp from "./views/PublicApp";
import { setAuthUser } from "./store/actions/authAction";

const ClientApp = () => {
  const currentUserRole = useSelector((state) => state.authReducer.authUser);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (!user) {
      const responseUser = JSON.parse(sessionStorage.getItem("responseUser"));
      dispatch(setAuthUser(responseUser));
      setUser(responseUser);
    }else{

    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        {(currentUserRole) ? <UserApp /> : <PublicApp />}
      </BrowserRouter>
    </div>
  );
};

export default ClientApp;
