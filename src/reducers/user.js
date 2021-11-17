const LOGIN = 'LOGIN';

const stateDefault = {
  email: 'fernando.luckesi94@gmail.com',
};

export default function (state = stateDefault, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.email,
      };
    default:
      return state;
  }
}
