import "../style/login.css";
import {useState, useRef,useEffect} from 'react'
import React from 'react'
import axios from 'axios'
import { BrowserRouter as Router,useNavigate,Link,Routes,Route } from 'react-router-dom'
import { prettyDOM } from "@testing-library/react";

export default function Login() {

//id, password 저장
// let [id, setId] = useState('');
  let [password, setPassword] = useState('');

  // const idFocus = useRef();            --> focus
  // const mounted = useRef(false)

  const navigate = useNavigate();

// 로그인 처리함수
  const LoginFunc = (e) => {
    // 버튼 누를 때마다 발생하는 리프레시 막기
    e.preventDefault();
    // if(!id) {                             --> id 미입력시 alert!
    //   return alert("enter id!");
    // }
    if(!password){
      return alert("enter password!")
    }
    else{
      let body ={
        password : password
      };
      axios.post('./dummy/login', body)  // 404 not found error 
      .then((res) => {
        console.log(res.data);
        if(res.data.code === 200){
          console.log("로그인");
          navigate('/dbpage')
        }
      })
      .catch((error) => {
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
  // 로고 누르면 색 변환 구현중.. input/button 사용하면 되긴 할듯..
  // const handleClick = (e) => {
  //   document.getElementById('lg_logo_Quipu').className += 'lg_logo_Quipu'
  //   alert(document.getElementById('lg_logo_Quipu').className)
  //   if(document.getElementById(e).className === 'lg_logo_Quipu') {
  //     document.getElementById('lg_logo_Quipu').className += '_changed';
  //     alert(document.getElementById('lg_logo_Quipu').className);
  //   }
  //   else{
  //     document.getElementsByClassName('lg_logo_Quipu').className -= '_changed';
  //   }
  // }

  // useEffect(() => {                                    --> focus 실패
  //   console.log('마운트됨')
  //   return () => {
  //     if (mounted.current === false){
  //       idFocus.current.focus();
  //       mounted.current = true;
  //     }
  //   }
  // }, [])

  return (
    <div className="lg_container">
      <header className="lg_logo_Quipu" /*onClick = { (e) => handleClick(e) }  -->  클릭 시 색상변경 구현중 */>
        Quipu_DB
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
            e n t e r<input className="lg_input_password" id='password' type="password" value={password} /*ref={idFocus}*/ onChange={(e) => {setPassword(e.target.value)}} onKeyDown={ (e) => handleKeyPress(e) }></input>
            <label htmlFor="password">p a s s w o r d</label>
          </span>
        </form>
        {/* <button className="lg_button_signin" type="button" onClick={ (e) => LoginFunc(e) }>
          Sign In
        </button> */}
      </div>
      <footer className="lg_copyright">
      Copyright 2024.<span className="Quipu">QUIPU</span>. All rights reserved.
      </footer>
    </div>
  );
}