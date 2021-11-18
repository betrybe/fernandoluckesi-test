import React from 'react';
import WalletHeader from '../../components/WalletHeader';
import ExpenseForm from '../../components/ExpenseForm';
import ExpensesTable from '../../components/ExpensesTable';
import './Wallet.css';

class Wallet extends React.Component {
	render() {
		return (
			<div className='mainContainerWallet'>
				<WalletHeader />
				<ExpenseForm />
        <ExpensesTable />
			</div>
		);
	}
}

export default Wallet;
