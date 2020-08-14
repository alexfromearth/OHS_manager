import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";

const initialState = {
  list: [],
  worker: null,
}

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ALL_EMPLOYEES: {
      return {
        ...state,
        list: action.payload.list,
      }
    }
    case actionTypes.EACH_WORKER: {
      return {
        ...state,
        worker: action.payload.worker,
      }
    }
    default:
      return state;
  }
}

export default employeeReducer;
