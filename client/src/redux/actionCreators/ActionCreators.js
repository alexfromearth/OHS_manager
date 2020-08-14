import actionTypes from "../actionTypes/actionTypes";

//action creators
export const isLoading = (isLoading) => ({ type: actionTypes.IS_LOADING, payload: { isLoading } });
export const setAuthUser = (_id, companyName, generalInfo, secret) => ({
  type: actionTypes.AUTENTICATED_SUCCESSFUL,
  payload: { _id, companyName, generalInfo, secret }
});
export const setError = (message) => ({ type: actionTypes.SET_VALIDATION_ERROR, payload: { message } });
// forms
export const setNewEmployeeFormInput = (inputName, value) => ({
  type: actionTypes.SET_NEW_EMPLOYEE_FORM_INPUT,
  payload: { inputName, value }
})

//saga creators
export const loginSC = (fieldData) => ({ type: actionTypes.LOGIN, payload: fieldData });
export const submitFormInputSC = (companyId, generalInfo, profInfo) => ({
  type: actionTypes.SUBMIT_NEWEMPLOYEE_FORM,
  payload: { companyId, generalInfo, profInfo },
})

export const allStaff = (list) => ({ type: actionTypes.ALL_EMPLOYEES, payload: { list } });

export const eachWorker = (worker) => ({ type: actionTypes.EACH_WORKER, payload: { worker } });
