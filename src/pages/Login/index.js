import React from 'react';
import logoImage from '../../assets/images/logo.png';
import './Login.css';

class Login extends React.Component {
	render() {
		return (
			<div className='mainContainerLogin'>
				<div className='formContainerLogin'>
					<div className='logoContainerLogin'>
						<p className='titleLogoLogin'>Trybe Wallet</p>
						<img
							src={logoImage}
							alt='logo Trybe Wallet'
							className='logoLogin'
						/>
					</div>
					<div className='inputsContainerLogin'>
						<input
							className='inputLogin'
							data-testid='email-input'
							placeholder='Digite seu e-mail'
						/>
						<input
							className='inputLogin'
							data-testid='password-input'
							placeholder='Digite sua senha'
						/>
						<button className='btnLogin'>Entrar</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
