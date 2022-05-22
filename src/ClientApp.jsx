import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserApp from "./views/UserApp";
import PublicApp from "./views/PublicApp";
import { setAuthUser } from "./store/actions/authAction";
import { createTheme, ThemeProvider } from '@mui/material/styles'

const ClientApp = () => {
  const currentUser= useSelector((state) => state.authReducer.authUser);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#a52a2a',
      }
    },
  });

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
     <ThemeProvider theme={theme}>
        <BrowserRouter>
          {(currentUser) ? <UserApp /> : <PublicApp />}
        </BrowserRouter>
     </ThemeProvider>
    </div>
  );
};

export default ClientApp;
