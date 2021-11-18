import React from 'react';
import { connect } from 'react-redux';
import './WalletHeader.css';

class WalletHeader extends React.Component {
  render() {
    const { getUserEmail, expenses } = this.props;
    const sumExpenses = expenses.reduce((acc, current) => acc + parseFloat(current.value), 0) || 0;
    const decimal = 10;
    return (
      <div className="mainContaierWalletHeader">
        <p data-testid="email-field">{ getUserEmail }</p>
        <p data-testid="total-field">
          Despesa total: R$
          { sumExpenses.toFixed(2, decimal) }
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getUserEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletHeader);
