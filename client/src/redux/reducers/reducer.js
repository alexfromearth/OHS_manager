import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
  companyId: "5f355ce0bb328e317d721d75", // !!!!!!
  companyName: null,
  generalInfo: null,
  secret: null,
  workers: [],
  isAuth: false,
  errorMessage: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // логинизация
    case actionTypes.AUTENTICATED_SUCCESSFUL: {
      const newState = deepcopy(state);
      newState.companyId = action.payload._id;
      newState.companyName = action.payload.companyName;
      newState.generalInfo = action.payload.generalInfo;
      newState.secret = action.payload.secret;
      newState.isAuth = true;
      //делаем
      return newState;
    }
    case actionTypes.SET_VALIDATION_ERROR: {
        return {
          ...state,
          errorMessage: action.payload.message
        }
    }

    default:
      return state;
  }
}

export default reducer;
