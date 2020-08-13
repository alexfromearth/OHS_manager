import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";

const initialState = {
  list: [],
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.ALL_EMPLOYEES: {
          return {
              ...state,
              list: action.payload.list,
          }
      }
      default:
          return state;
  }
}

export default employeeReducer;
