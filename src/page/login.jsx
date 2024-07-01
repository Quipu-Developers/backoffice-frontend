import "../style/login.css";

export default function Login() {

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
        <button className="lg_button_signin">
          Sign In
        </button>
      </div>
      <footer className="lg_copyright">
        Copyright 2024.QUIPU. All rights reserved.
      </footer>
    </div>
  );
}
