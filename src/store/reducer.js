import types from './actionTypes';

const initialState = {
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_LOADING:
      return { ...state, loading: !state.loading }
    default:
      return state;
  }
};

export default reducer;