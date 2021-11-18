const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
const RECEIVE_FAIL = 'RECEIVE_FAIL';

const ADD_EXPENSE = 'ADD_EXPENSE';

const stateDefault = {
	currencies: [],
	expenses: [],
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
		default:
			return state;
	}
};
