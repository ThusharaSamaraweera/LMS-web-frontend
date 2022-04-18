import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/me' element={<Dashboard/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
