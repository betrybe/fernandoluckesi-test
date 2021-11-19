import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { actionLogin } from '../../actions';
import logoImage from '../../assets/images/logo.png';
import './FormLogin.css';

class FormLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailInvalid: false,
      passwordInvalid: false,
      btnLoginDisable: true,
      login: false,
    };
  }

  onChangeEmail(event) {
    const { password } = this.state;
    const email = event.target.value;
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!emailRegex.test(email)) {
      this.setState({
        email: '',
        emailInvalid: true,
        btnLoginDisable: true,
      });
    } else {
      this.setState({
        email,
        emailInvalid: false,
      });
    }
    if (emailRegex.test(email) && password) {
      this.setState({ btnLoginDisable: false });
    }
  }

  onChangePassword(event) {
    const { email } = this.state;
    const password = event.target.value;
    const minPasswordLength = 6;
    if (password.length < minPasswordLength) {
      this.setState({
        password: '',
        passwordInvalid: true,
        btnLoginDisable: true,
      });
    } else {
      this.setState({
        password,
        passwordInvalid: false,
      });
    }
    if (password.length >= minPasswordLength && email) {
      this.setState({ btnLoginDisable: false });
    }
  }

  loginHandler() {
    this.setState({
      login: true,
    });
    const { email } = this.state;
    const { saveEmail } = this.props;
    saveEmail(email);
  }

  render() {
    const { emailInvalid, passwordInvalid, login, btnLoginDisable } = this.state;
    if (login) return <Redirect to="/carteira" />;

    return (
      <div className="formContainerLogin">
        <div className="logoContainerLogin">
          <p className="titleLogoLogin">
            Trybe
            <span className="titleLogoLoginSpan">Wallet</span>
          </p>
          <img src={ logoImage } alt="logo Trybe Wallet" className="logoLogin" />
        </div>
        <div className="inputsContainerLogin">
          <input
            type="text"
            className="inputLogin"
            data-testid="email-input"
            placeholder="Digite seu e-mail"
            onChange={ (event) => this.onChangeEmail(event) }
          />
          {emailInvalid && (
            <p
              className="msgErrorLogin"
            >
              E-mail inválido. Digite um e-mail no formato: email@email.com
            </p>
          )}
          <input
            type="password"
            className="inputLogin"
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ (event) => this.onChangePassword(event) }
          />
          {passwordInvalid && (
            <p
              className="msgErrorLogin"
            >
              Senha inválida. A senha deve ter no minímo 6 digitos dsdsdsd
            </p>
          )}
          <button
            type="button"
            disabled={ btnLoginDisable }
            className="btnLogin"
            onClick={ () => this.loginHandler() }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => dispatch(actionLogin(email)),
});

FormLogin.propTypes = {
  saveEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(FormLogin);
