import actionTypes from "../actionTypes/actionTypes";

//action creators
export const isLoading = (isLoading) => ({type: actionTypes.IS_LOADING, payload: {isLoading}});
export const setAuthUser = (_id, companyName, generalInfo, secret) => ({
  type: actionTypes.AUTENTICATED_SUCCESSFUL,
  payload: {_id, companyName, generalInfo, secret}
});
export const setError = (message) => ({type: actionTypes.SET_VALIDATION_ERROR, payload: {message}});
// upload
export const beforeUpload = (file) => ({type: actionTypes.BEFORE_UPLOAD, payload: {file}});
export const scanRemove = (file) => ({type: actionTypes.ON_SCAN_REMOVE, payload: {file}});
export const clearFileList = () => ({type: actionTypes.CLEAR_FILELIST})
export const setUpload = (value) => ({type: actionTypes.SET_UPLOAD, payload: {value}});
export const loadSuccess = () => ({type: actionTypes.UPLOAD_SUCCESS});
export const uploadingFailed = (message) => ({type: actionTypes.UPLOADING_FAILED, payload: {message}});
// forms
export const setNewEmployeeFormInput = (inputName, value) => ({
  type: actionTypes.SET_NEW_EMPLOYEE_FORM_INPUT,
  payload: {inputName, value}
})

// docs
export const updateSignedDocs = (signedOhsIds) => ({type: actionTypes.UPDATE_SIGNED_DOCS, payload: {signedOhsIds}})
export const updateColumns = (newColumns) => ({type: actionTypes.UPDATE_COLUMNS, payload: {newColumns}})

//saga creators
export const loginSC = (fieldData) => ({type: actionTypes.LOGIN, payload: fieldData});
export const submitFormInputSC = (companyId, generalInfo, profInfo) => ({
  type: actionTypes.SUBMIT_NEWEMPLOYEE_FORM,
  payload: {companyId, generalInfo, profInfo},
})
export const uploadScansSC = (formData, companyId, workerId) => ({
  type: actionTypes.UPLOADS_SCANS_SC,
  payload: {formData, companyId, workerId}
});

export const uploadMedsSC = (formData, dateOf, type, companyId, workerId) => ({
  type: actionTypes.UPLOADS_MEDS_SC,
  payload: {formData, dateOf, type, companyId, workerId},
})

export const allStaff = (list) => ({type: actionTypes.ALL_EMPLOYEES, payload: {list}});

export const eachWorker = (worker) => ({type: actionTypes.EACH_WORKER, payload: {worker}});

export const deleteWorker = () => ({type: actionTypes.DELETE_WORKER});

