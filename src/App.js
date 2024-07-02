import "./App.css";
import React from 'react'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'
import Dbpage from "./page/dbpage";
import Login from "./page/login";

function App() {
  return (
    <div className="container">
      <Login />
    </div>
  );
}

export default App;
