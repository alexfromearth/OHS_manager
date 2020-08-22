import actionTypes from "../actionTypes/actionTypes";
import deepcopy from "deepcopy";

const initialState = {
    firstName: '',
    lastName: '',
    middleName: '',
    birthday: '',
    sex: '',
    birthPlace: '',
    address: '',
    education: '',
    structuralSubdivision: '',
    startWorkDate: '',
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
        case actionTypes.ALL_INPUT_SET: {
            return {
                ...state,
                ...action.payload.generalInfo,
                ...action.payload.profInfo,
            }
        }
        case actionTypes.CLEAR_FORM_IMPUT: {
            return {
                ...state,
                firstName: '',
                lastName: '',
                middleName: '',
                birthday: '',
                sex: '',
                birthPlace: '',
                address: '',
                education: '',
                structuralSubdivision: '',
                startWorkDate: '',
                position: '',
                workExperience: '',
            }
        }
        case actionTypes.TRIM_INPUTS: {
            const newState = deepcopy(state);
            Object.keys(newState).map(k => newState[k] = newState[k].trim());
            return newState;
        }
        default:
            return state;
    }
}

export default newEmployeeReducer;
