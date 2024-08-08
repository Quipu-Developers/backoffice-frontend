import "../style/login.css";
import {useState, useRef,useEffect} from 'react'
import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'

export default function Login() {

// id, password 저장
// let [id, setId] = useState('');
  let [password, setPassword] = useState('');
// pwFocus 설정
  const pwFocus = useRef(true);

  const navigate = useNavigate();

// 로그인 처리함수
  const LoginFunc = (e) => {
    // 버튼 누를 때마다 발생하는 리프레시 막기
    e.preventDefault();
    // if(!id) {                             --> id 미입력시 alert!
    //   return alert("enter id!");
    // }
    if(!password){
      return alert("Enter PW!")
    }
    else{
      let body = {
        username : "admin",
        password : password
      };
      axios.post('http://localhost:3001/auth/login', body, {
        headers : { 'Content-Type': 'application/json', },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200){
          navigate('/recruitDB')
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert('Worng PW!')
        }
        else if (error.response && error.response.status === 500) {
          alert('서버 오류!')
        }
        console.log(error, "error");
      });
      };
    };

// 로그인 시 엔터키로 넘어가는 경우를 위한 함수
  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      LoginFunc(e);
    };
  };
// pw focus 함수
  useEffect(() => {
    console.log('마운트됨')
    return () => {
      if(pwFocus.current){
        console.log('focus')
        pwFocus.current.focus();
        pwFocus.current = false
      }
    }
  }, [])

  return (
    <div className="lg_container">
      <header className="lg_logo_Quipu">
        Q u i p u _ D B
      </header>
      <div className="lg_box_login">
        <form>
          {/*<span className="lg_logo_login">   -->  id 입력코드, 필요에 의해 주석처리
            Login
          </span> */}
          {/* <span className="lg_id">
            id : <input className="lg_input_id" type="text" value={id} onChange={(e) => {setId(e.target.value)}} onKeyDown={ (e) => handleKeyPress(e) }></input>
          </span> */}
          <span className="lg_password">
            e n t e r<input className="lg_input_password" id='password' type="password" value={password} ref={pwFocus} onChange={(e) => {setPassword(e.target.value)}} onKeyDown={ (e) => handleKeyPress(e) }></input>
            <label htmlFor="password">p a s s w o r d</label>
          </span>
        </form>
        {/* <button className="lg_button_signin" type="button" onClick={ (e) => LoginFunc(e) }>
          Sign In
        </button> */}
      </div>
      <footer className="lg_copyright">
      Copyright 2024.&nbsp;<span className="Quipu">QUIPU</span>&nbsp;. All rights reserved.
      </footer>
    </div>
  );
}