import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, editExpense } from '../../actions';
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
    const { fetchCurrencies, expenseIdEdit, expenses } = this.props;
    fetchCurrencies();
    expenses.forEach((expense) => {
      if (expense.id === expenseIdEdit) {
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
    const expenseState = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    const { editExpense, expenses, expenseIdEdit } = this.props;
    expenses.forEach((expense) => {
      if (expense.id === expenseIdEdit) {
        return {
          ...expense, expenseState,
        };
      }
    });
    console.log(expenses);
    // editExpense(expense);
  }

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    return (
      <div className="mainContainerExpenseForm">
        <p>Form edit</p>
        <form className="cotainerFormExpenseForm">
          <label>
            Valor:
            <input
              type="text"
              name="value"
              onChange={ (event) => this.onChangeValue(event) }
              value={ value }
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              onChange={ (event) => this.onChangeDescription(event) }
              value={ description }
            />
          </label>
          <label>
            Moeda:
            <select
              name="currency"
              onChange={ (event) => this.onChangeCurrency(event) }
              value={ currency }
            >
              {currencies.map((currency, index) => (
                <option key={ index } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select onChange={ (event) => this.onChangeMethod(event) } name="paymentMethod" value={ method }>
              <option value="money" selected>
                Dinheiro
              </option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select onChange={ (event) => this.onChangeTag(event) } name="expense" value={ tag }>
              <option value="food" selected>
                Alimentação
              </option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ () => this.onClickEditExpense() }>
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
  editExpense: (expense) => dispatch(editExpense(expense)),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormEdit);
