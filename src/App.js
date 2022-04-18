import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from './components/home';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/me' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
