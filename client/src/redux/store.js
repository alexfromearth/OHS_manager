import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reduxSaga from 'redux-saga'
import { all } from 'redux-saga/effects'
import reducer from "./reducers/reducer";
import LoginSaga from './sagas/LoginSaga'
import newEmployeeReducer from "./reducers/newEmployeeReducer";
import employeeReducer from "./reducers/empolyeeReduser.js";
import SubmitFormsWatcher from "./sagas/SubmitFormsSaga";
import UploadScansWatcher from "./sagas/uploadScansSaga";
import UploadMedicWatcher from "./sagas/uploadMedic";
import LogoutSaga from './sagas/LogoutSaga';
import EditEmployeeInfoWatcher from "./sagas/EditEmployeeInfoSaga";
import SeedDBWatcher from "./sagas/SeedSaga";
import AuthSaga from './sagas/authSaga.js';

const sagaMiddlewear = reduxSaga()

const store = createStore(
  combineReducers({
    auth: reducer,
    forms: newEmployeeReducer,
    allStaff: employeeReducer,
  }),
  composeWithDevTools(applyMiddleware(thunk, sagaMiddlewear))
);

sagaMiddlewear.run(
  function* () {
    yield all([
      AuthSaga(),
      LoginSaga(),
      LogoutSaga(),
      SubmitFormsWatcher(),
      UploadScansWatcher(),
      UploadMedicWatcher(),
      EditEmployeeInfoWatcher(),
      SeedDBWatcher(),
    ])
  })


export default store;
