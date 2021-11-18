import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenseWithCurrencyQuotes } from '../../actions';
import './ExpenseForm.css';

class ExpenseForm extends React.Component {
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
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
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

  onClickAddExpense() {
    const { id, value, description, currency, method, tag } = this.state;
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };
    const { addExpense } = this.props;
    addExpense(expense);
    this.setState({ id: id + 1 });
  }

  render() {
    const { currencies } = this.props;

    return (
      <div className="mainContainerExpenseForm">
        <form className="cotainerFormExpenseForm">
          <label>
            Valor:
            <input
              type="text"
              name="value"
              onChange={(event) => this.onChangeValue(event)}
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="description"
              onChange={(event) => this.onChangeDescription(event)}
            />
          </label>
          <label>
            Moeda:
            <select
              name="currency"
              onChange={(event) => this.onChangeCurrency(event)}
            >
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label>
            Método de pagamento:
            <select onChange={(event) => this.onChangeMethod(event)} name="paymentMethod">
              <option value="money" selected>
                Dinheiro
              </option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label>
            Tag:
            <select onChange={(event) => this.onChangeTag(event)} name="expense">
              <option value="food" selected>
                Alimentação
              </option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={() => this.onClickAddExpense()}>
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  addExpense: (expense) => dispatch(addExpenseWithCurrencyQuotes(expense)),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
