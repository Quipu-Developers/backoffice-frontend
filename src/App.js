import "./App.css";
import React from 'react'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'
import Dbpage from "./page/dbpage";
import Login from "./page/login";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path={""} element={<Login />} />
          <Route path={"/dbpage"} element={<Dbpage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
