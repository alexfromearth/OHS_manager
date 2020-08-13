import actionTypes from "../actionTypes/actionTypes";

//action creators
export const isLoading = (isLoading) => ({type: actionTypes.IS_LOADING, payload: {isLoading}});
export const setAuthUser = (_id, companyName, generalInfo, secret) => ({
    type: actionTypes.AUTENTICATED_SUCCESSFUL,
    payload: {_id, companyName, generalInfo, secret}
});
export const setError = (message) => ({type: actionTypes.SET_VALIDATION_ERROR, payload: {message}});

//saga creators
export const loginSC = (fieldData) => ({type: actionTypes.LOGIN, payload: fieldData})