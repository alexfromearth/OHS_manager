import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
  companyId: null, // !!!!!!
  companyName: null,
  generalInfo: null,
  companyEmail: null,
  companyType: null,
  companyDirector: null,
  secret: null,
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
      newState.companyEmail = action.payload.companyEmail;
      newState.companyDirector = action.payload.companyDirector;
      newState.companyType = action.payload.companyType;
      newState.secret = action.payload.secret;
      newState.workers = action.payload.workers;
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

    case actionTypes.LOGOUT_SUCCESSFUL: {
      return {
        companyId: null,
        companyName: null,
        generalInfo: null,
        secret: null,
        workers: [],
        isAuth: false,
        errorMessage: null,
      }
    }

    default:
      return state;
  }
}

export default reducer;
