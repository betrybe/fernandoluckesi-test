const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const RECEIVE_FAIL = 'RECEIVE_FAIL';

const ADD_EXPENSE = 'ADD_EXPENSE';
const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
const SEND_EXPENSE_ID = 'SEND_EXPENSE_ID';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const stateDefault = {
  currencies: [],
  expenses: [],
  expenseIdEdit: null,
};

export default function (state = stateDefault, action) {
  switch (action.type) {
  case REQUEST_DATA:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      isFetching: false,
      currencies: action.currencies,
    };
  case RECEIVE_FAIL:
    return {
      ...state,
      error: action.error,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.expenseId),
    };
  case SEND_EXPENSE_ID:
    return {
      ...state,
      expenseIdEdit: action.expenseId,
    };
  case EDIT_EXPENSE:
    console.log('action aqui', action.expensesEdited);
    return {
      ...state,
      expenses: action.expensesEdited,
    };
  default:
    return state;
  }
}
