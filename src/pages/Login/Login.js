import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Message from '../../components/Message/Message';
import fetchApi from '../../utils/fetch';
import { handleChange } from '../../utils/handleChange';
import showMessage from '../../utils/showMessage';

function Login() {
  const [loginInformation, setLoginInformation] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState({ show: false, text: '' });

  const navigate = useNavigate();

  async function makeLogin() {
    const options = {
      method: 'POST',
      body: JSON.stringify(loginInformation)
    }

    const { user, message: apiMessage } = await fetchApi('https://odonteo-backend.herokuapp.com/login', options);

    
    if (apiMessage === 'Login efetuado com sucesso!') {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      showMessage(setMessage, apiMessage);
    }
  }

  return (
    <main>
      { message.show &&
        <Message>
          {message.text}
        </Message>
      }
      <form>
        <label htmlFor='email'>
          Email:
          <input
            className='form-input'
            id='email'
            name='email'
            type='text'
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <label htmlFor='password'>
          Senha:
          <input
            className='form-input'
            id='password'
            name='password'
            type='password'
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <Button
          addClassName='form-button'
          onClickFunction={makeLogin}
        >
          Entrar
        </Button>
      </form>
    </main>
  );
}

export default Login;
