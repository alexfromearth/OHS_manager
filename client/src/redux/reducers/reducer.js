import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
<<<<<<< HEAD
  companyId: "5f3cfcf74dd64ae18d4f0e4c", // !!!!!!
=======
  companyId: "5f3ceea572db0f058d425995", // !!!!!!
>>>>>>> 87652ecfa038d5b04c599db010e98dc047646c2b
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
