import './App.css';

function App() {
  return (
    <div className='container'>
      <header className='logo'>
        Quipu DB
      </header>
      <body className="login">
        <span className='Menu_login'>
          Login
        </span>
        <span className='id'>
          id : <input className='input_id'>
          </input>
        </span>
        <span className='password'>
          password : <input className='input_password'>
          </input>
        </span>
        <button className='button_signin'>
            Sign In
        </button>
      </body>
      <footer className='copyright'>
        Copyright 2024.QUIPU.
        All rights reserved.
      </footer>
    </div>
  );
}

export default App;
