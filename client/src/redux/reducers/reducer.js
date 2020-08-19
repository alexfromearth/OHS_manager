import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
  companyId: "5f3d19165eb7134d7064d20e", // !!!!!!
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
      console.log('here')
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
