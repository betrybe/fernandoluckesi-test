const ADD_EXPENSE = 'ADD_EXPENSE';

const stateDefault = {
  currencies: [],
  expenses: [],
};

export default function 
(state = stateDefault, action) {
  switch (action.type) {
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: action.expenses,
      };
    default:
      return state;
  }
}
