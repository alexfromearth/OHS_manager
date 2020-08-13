import deepcopy from "deepcopy";

const reducer = (state, action) => {
  switch (action.type) {
    // логинизация
    case actionTypes.AUTENTICATED_SUCCESSFUL: {
      const newState = deepcopy(state);
      //делаем
      return newState;
    }

    default:
      return state;
  }
}

export default reducer;
