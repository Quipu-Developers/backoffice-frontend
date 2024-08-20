import "../style/login.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;
console.log(BASE_URL);
console.log(FRONTEND_URL);

export default function Login() {
  // id, password 저장
  // let [id, setId] = useState('');
  let [password, setPassword] = useState("");
  // pwFocus 설정
  const pwFocus = useRef(true);

  const navigate = useNavigate();

  // 로그인 처리함수
  const LoginFunc = (e) => {
    e.preventDefault();

    if (!password) {
      return alert("Enter PW!");
    } else {
      const body = {
        username: "admin",
        password: password,
      };

      axios
        .post(`${BASE_URL}/bo/auth/login`, body, {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
            Origin: FRONTEND_URL,
          },
          withCredentials: true, // 쿠키를 포함시키기 위해 설정
        })
        .then((response) => {
          if (response.status === 200) {
            // 쿠키를 가져와서 axios에 설정
            const setCookieHeader = response.headers["set-cookie"];
            if (setCookieHeader) {
              const sidCookie = setCookieHeader.find((cookie) =>
                cookie.startsWith("connect.sid=")
              );
              if (sidCookie) {
                // axios 기본 설정에 쿠키를 포함시킴
                axios.defaults.headers.common["Cookie"] = sidCookie;
              }
            }
            navigate("/recruitDB");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            alert("Wrong PW!");
          } else if (error.response && error.response.status === 500) {
            alert("서버 오류!");
          }
        });
    }
  };

  // 로그인 시 엔터키로 넘어가는 경우를 위한 함수
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      LoginFunc(e);
    }
  };
  // pw focus 함수
  useEffect(() => {
    return () => {
      if (pwFocus.current) {
        pwFocus.current.focus();
        pwFocus.current = false;
      }
    };
  }, []);

  return (
    <div className="lg_container">
      <header className="lg_logo_Quipu">Q u i p u _ D B</header>
      <div className="lg_box_login">
        <form>
          {/*<span className="lg_logo_login">   -->  id 입력코드, 필요에 의해 주석처리
            Login
          </span> */}
          {/* <span className="lg_id">
            id : <input className="lg_input_id" type="text" value={id} onChange={(e) => {setId(e.target.value)}} onKeyDown={ (e) => handleKeyPress(e) }></input>
          </span> */}
          <span className="lg_password">
            e n t e r
            <input
              className="lg_input_password"
              id="password"
              type="password"
              value={password}
              ref={pwFocus}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => handleKeyPress(e)}
            ></input>
            <label htmlFor="password">p a s s w o r d</label>
          </span>
        </form>
        {/* <button className="lg_button_signin" type="button" onClick={ (e) => LoginFunc(e) }>
          Sign In
        </button> */}
      </div>
      <footer className="lg_copyright">
        Copyright 2024.&nbsp;<span className="Quipu">QUIPU</span>&nbsp;. All
        rights reserved.
      </footer>
    </div>
  );
}
