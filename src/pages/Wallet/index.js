import React from 'react';
import WalletHeader from '../../components/WalletHeader';
import ExpenseForm from '../../components/ExpenseForm';
import './Wallet.css';

class Wallet extends React.Component {
	render() {
		return (
			<div className='mainContainerWallet'>
				<WalletHeader />
				<ExpenseForm />
			</div>
		);
	}
}

export default Wallet;
