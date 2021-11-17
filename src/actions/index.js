const ADD_EXPENSE = 'ADD_EXPENSE';

const LOGIN = 'LOGIN';

export const actionLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});
