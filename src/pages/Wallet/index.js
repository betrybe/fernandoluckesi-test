import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletHeader from '../../components/WalletHeader';
import ExpenseForm from '../../components/ExpenseForm';
import ExpenseFormEdit from '../../components/ExpenseFormEdit';
import ExpensesTable from '../../components/ExpensesTable';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    const { expenseIdEdit } = this.props;
    return (
      <div className="mainContainerWallet">
        <WalletHeader />
        {expenseIdEdit === '' && <ExpenseForm />}
        {expenseIdEdit !== '' && <ExpenseFormEdit />}
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenseIdEdit: state.wallet.expenseIdEdit,
});

Wallet.propTypes = {
  expenseIdEdit: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Wallet);
