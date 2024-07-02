import "../style/login.css";
import {useState} from 'react'
import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'

export default function Login() {

  let [id, setId] = useState('');
  let [password, setPassword] = useState('');

  const navigate = useNavigate();

  const LoginFunc = (e) => {
    e.preventDefault();
    if(!id) {
      return alert("enter id!");
    }
    else if(!password){
      return alert("enter password!")
    }
    else{
      navigate('/dbpage')
    }
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
          id : <input className="lg_input_id" type="text" value={id} onChange={(e) => {setId(e.target.value)}}></input>
        </span>
        <span className="lg_password">
          password : <input className="lg_input_password" type="password" value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        </span>
        <button className="lg_button_signin" type="button" onClick={ LoginFunc }>
          Sign In
        </button>
      </div>
      <footer className="lg_copyright">
        Copyright 2024.QUIPU. All rights reserved.
      </footer>
    </div>
  );
}

// axios 연동 및 CSS