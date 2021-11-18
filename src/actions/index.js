import apiCurrencyQuotes from "../services/apiCurrencyQuotes";

const REQUEST_DATA = "REQUEST_DATA";
const RECEIVE_CURRENCIES = "RECEIVE_CURRENCIES";
const RECEIVE_FAIL = "RECEIVE_FAIL";

const ADD_EXPENSE = "ADD_EXPENSE";

const LOGIN = "LOGIN";

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

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestData());

    return apiCurrencyQuotes().then(
      (data) => {
        const currencies = Object.keys(data);
        console.log(currencies);
        const currenciesFilter = currencies.filter(
          (currency) => currency !== "USDT"
        );
        dispatch(receiveCurrencies(currenciesFilter));
      },
      (error) => dispatch(receiveFail(error.message))
    );
  };
}

export function addExpenseWithCurrencyQuotes(expense) {
  return (dispatch) => {
    dispatch(requestData());

    return apiCurrencyQuotes().then(
      (data) => {
        const keysData = Object.keys(data);
        let dataArray = [];
        for (let i = 0; i < keysData.length; i += 1) {
          if (keysData[i] !== "USDT") {
            dataArray = [...dataArray, data[keysData[i]]];
          }
        }
        dispatch(addExpense({ ...expense, exchangeRates: dataArray }));
      },
      (error) => dispatch(receiveFail(error.message))
    );
  };
}
