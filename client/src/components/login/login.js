import { useContext, useRef } from 'react';
import { UserContext } from '../../app';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

export default function LoginForm()
{
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  function login()
  {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email === '' || !emailRegex.test(email))
    {
      console.log('Fill your email correctly')
      return;
    }
    
    if (password === '' || password.length < 8)
    {
      console.log('Fill your password correctly')
      return;
    }

    axios.post(`${process.env.REACT_APP_SERVER_ROUTE}/user-login`, [email, password])
      .then(res => 
      {
        console.log(res.data);
        setUser(res.data);
        navigate('/');
      })
  }

  return (
    <div className="login">
      <div className="login__form">
        <img src="img/logo--dark_theme.svg" className="login__logo" alt="" />

        <div className="login__inputs">
          <div className="login__input">
            <FontAwesomeIcon icon={ faEnvelope }/>
            <input type="email" ref={ emailRef } name="email" id="email" placeholder="Email"/>
          </div>

          <div className="login__input">
            <FontAwesomeIcon icon={ faKey }/>
            <input type="password" ref={ passwordRef } name="password" id="password" placeholder="password" />
          </div>


        </div>

        <button className="login__auth" onClick={ login }>LOGIN</button>
      </div>

      <div className="login__background">
        <img src="img/loading.svg" alt="" />
      </div>
    </div>
  )
}