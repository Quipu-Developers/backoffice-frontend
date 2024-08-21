import "../style/login.css";
import { useState, useRef, useEffect } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export default function Login() {
  let [password, setPassword] = useState("");
  const pwFocus = useRef(true);

  const navigate = useNavigate();

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
          withCredentials: true,
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
          } else {
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
      <header className="lg_logo_Quipu">Quipu Admin</header>
      <div className="lg_box_login">
        <form>
          <span className="lg_password">
            <label>e n t e r</label>
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
            <button onClick={(e) => LoginFunc(e)}>login</button>
            <label htmlFor="password">p a s s w o r d</label>
          </span>
        </form>
      </div>
      <footer className="lg_copyright">
        Copyright 2024.&nbsp;<span className="Quipu">QUIPU.</span>&nbsp;
        <br></br>All rights reserved.
      </footer>
    </div>
  );
}
