import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from './components/home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import CourseManagement from './components/courseManagement';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { brown } from '@mui/material/colors';
import "./assets/styles/global.css";

const theme = createTheme({
  palette: {
    mainBrown: {
      main: '#a52a2a',
    },
  },
});

function App() {
  const store = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path='/dashboard/*' element={<Dashboard/>} />
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
            </Routes>
          </BrowserRouter>
      </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
