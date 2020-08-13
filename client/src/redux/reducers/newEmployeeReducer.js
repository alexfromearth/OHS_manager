import deepcopy from "deepcopy";
import actionTypes from "../actionTypes/actionTypes";


const initialState = {
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '',
    birthPlace: '',
    address: '',
    education: '',
    position: '',
    workExperience: '',
}

const newEmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_NEW_EMPLOYEE_FORM_INPUT: {
            return {
                ...state,
                [action.payload.inputName]: action.payload.value,
            }
        }
        default:
            return state;
    }
}

export default newEmployeeReducer;
