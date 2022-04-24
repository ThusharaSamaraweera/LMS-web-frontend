import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from './components/home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import CourseManagement from './components/courseManagement';

function App() {
  const store = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='dashboard/*' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
