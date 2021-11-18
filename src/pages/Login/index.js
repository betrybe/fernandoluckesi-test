import React from 'react';
import FormLogin from '../../components/FormLogin';
import './Login.css';

class Login extends React.Component {
  render() {
    return (
      <div className='mainContainerLogin'>
        <FormLogin />
      </div>
    );
  }
}

export default Login;
