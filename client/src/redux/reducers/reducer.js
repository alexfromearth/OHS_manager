import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
  companyId: "5f3b9e5e578940434aaaaaa6", // !!!!!!
  companyName: null,
  generalInfo: null,
  secret: null,
  isAuth: true,
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
