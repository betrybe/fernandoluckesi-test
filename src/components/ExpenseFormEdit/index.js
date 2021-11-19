import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies, editExpense, sendExpenseId } from '../../actions';
import './ExpenseFormEdit.css';

class ExpenseFormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProps, expenseIdEdit, expenses } = this.props;
    fetchCurrenciesProps();
    const parseExpenseIdEdit = parseInt(expenseIdEdit, 10);
    expenses.forEach((expense) => {
      if (expense.id === parseExpenseIdEdit) {
        this.setState({
          id: expense.id,
          value: expense.value,
          description: expense.description,
          currency: expense.currency,
          method: expense.method,
          tag: expense.tag,
        });
      }
    });
  }

  onChangeValue(event) {
    this.setState({ value: event.target.value });
  }

  onChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  onChangeCurrency(event) {
    this.setState({ currency: event.target.value });
  }

  onChangeMethod(event) {
    this.setState({ method: event.target.value });
  }

  onChangeTag(event) {
    this.setState({ tag: event.target.value });
  }

  onClickEditExpense() {
    const { id, value, description, currency, method, tag } = this.state;
    const { editExpenseProps, expenses, expenseIdEdit, sendExpenseIdProps } = this.props;
    const expensesEdited = [...expenses];
    const parseExpenseIdEdit = parseInt(expenseIdEdit, 10);
    const objIndex = expenses
      .findIndex(((expense) => expense.id === parseExpenseIdEdit));
    expensesEdited[objIndex] = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: expensesEdited[objIndex].exchangeRates,
    };
    editExpenseProps(expensesEdited);
    sendExpenseIdProps('');
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="mainContainerExpenseFormEdit">
        <form method="POST" className="cotainerFormExpenseForm">
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              label="value"
              type="text"
              name="value"
              onChange={ (event) => this.onChangeValue(event) }
              value={ value }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              label="description"
              type="text"
              name="description"
              onChange={ (event) => this.onChangeDescription(event) }
              value={ description }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              label="currency"
              name="currency"
              onChange={ (event) => this.onChangeCurrency(event) }
              value={ currency }
            >
              {currencies.map((currencyItem, index) => (
                <option key={ index } value={ currencyItem }>
                  {currencyItem}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              data-testid="method-input"
              label="paymentMethod"
              onChange={ (event) => this.onChangeMethod(event) }
              name="paymentMethod"
              value={ method }
            >
              <option value="money" selected>
                Dinheiro
              </option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expense">
            Tag:
            <select
              data-testid="tag-input"
              label="expense"
              onChange={ (event) => this.onChangeTag(event) }
              name="expense"
              value={ tag }
            >
              <option value="food" selected>
                Alimentação
              </option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            className="btnEditExpense"
            type="button"
            onClick={ () => this.onClickEditExpense() }
          >
            Editar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenseIdEdit: state.wallet.expenseIdEdit,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenseProps: (expensesEdited) => dispatch(editExpense(expensesEdited)),
  fetchCurrenciesProps: () => dispatch(fetchCurrencies()),
  sendExpenseIdProps: (expenseId) => dispatch(sendExpenseId(expenseId)),
});

ExpenseFormEdit.propTypes = {
  fetchCurrenciesProps: PropTypes.func.isRequired,
  expenseIdEdit: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  editExpenseProps: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  sendExpenseIdProps: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormEdit);
