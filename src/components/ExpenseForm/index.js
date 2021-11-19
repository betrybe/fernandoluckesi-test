import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    const { fetchCurrenciesProps } = this.props;
    fetchCurrenciesProps();
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
          <label htmlFor="value">
            Valor:
            <input
              type="text"
              name="value"
              onChange={ (event) => this.onChangeValue(event) }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              type="text"
              name="description"
              onChange={ (event) => this.onChangeDescription(event) }
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              name="currency"
              onChange={ (event) => this.onChangeCurrency(event) }
            >
              {currencies.map((currency, index) => (
                <option key={ index } value={ currency }>
                  {currency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="paymentMethod">
            Método de pagamento:
            <select
              onChange={ (event) => this.onChangeMethod(event) }
              name="paymentMethod"
            >
              <option value="Dinheiro" selected>
                Dinheiro
              </option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="expense">
            Tag:
            <select onChange={ (event) => this.onChangeTag(event) } name="expense">
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
            className="btnAddExpense"
            type="button"
            onClick={ () => this.onClickAddExpense() }
          >
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
  fetchCurrenciesProps: () => dispatch(fetchCurrencies()),
});

ExpenseForm.propTypes = {
  fetchCurrenciesProps: PropTypes.func.isRequired,
  addExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
