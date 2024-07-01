import "../style/login.css";
import {useState} from 'react'
import React from 'react'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'

export default function Login() {

  let [id_input, id_input_change] = useState('');
  let [password_input, password_input_change] = useState('');

  const navigate = useNavigate();

  function handleClick() {
    navigate("/dbpage");
  }

  return (
    <div className="lg_container">
      <header className="lg_logo">
        Quipu DB
      </header>
      <div className="lg_login">
        <span className="lg_Menu_login">
          Login
        </span>
        <span className="lg_id">
          id : <input className="lg_input_id"></input>
        </span>
        <span className="lg_password">
          password : <input className="lg_input_password"></input>
        </span>
        <button className="lg_button_signin" onClick={ () => {navigate('/dbpage')} }>
          Sign In
        </button>
      </div>
      <footer className="lg_copyright">
        Copyright 2024.QUIPU. All rights reserved.
      </footer>
    </div>
  );
}

// navigate가 작동을 안함;