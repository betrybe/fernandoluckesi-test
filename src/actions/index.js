import apiCurrencyQuotes from '../services/apiCurrencyQuotes';

const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const RECEIVE_FAIL = 'RECEIVE_FAIL';

const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const SEND_EXPENSE_ID = 'SEND_EXPENSE_ID';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const LOGIN = 'LOGIN';

const requestData = () => ({
  type: REQUEST_DATA,
});

const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

const receiveFail = (error) => ({
  type: RECEIVE_FAIL,
  error,
});

export const actionLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  expenseId,
});

export const sendExpenseId = (expenseId) => ({
  type: SEND_EXPENSE_ID,
  expenseId,
});

export const editExpense = (expensesEdited) => ({
  type: EDIT_EXPENSE,
  expensesEdited,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestData());

    return apiCurrencyQuotes().then(
      (data) => {
        const currencies = Object.keys(data);
        const currenciesFilter = currencies.filter(
          (currency) => currency !== 'USDT',
        );
        dispatch(receiveCurrencies(currenciesFilter));
      },
      (error) => dispatch(receiveFail(error.message)),
    );
  };
}

export function addExpenseWithCurrencyQuotes(expense) {
  return (dispatch) => {
    dispatch(requestData());

    return apiCurrencyQuotes().then(
      (data) => {
        delete data.USDT;
        dispatch(addExpense({ ...expense, exchangeRates: data }));
      },
      (error) => dispatch(receiveFail(error.message)),
    );
  };
}
