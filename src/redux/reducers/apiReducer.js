import * as apiActions from './../actions/apiActions';

const INITIAL_STATE = {
  user: {},
  token: ""
};

function apiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case apiActions.STORE_TOKEN:
      return {
        ...state,
        token: action.payload
      };

    case apiActions.STORE_USER:
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
}

export default apiReducer;
