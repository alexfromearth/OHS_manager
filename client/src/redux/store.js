import { createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import reduxSaga from 'redux-saga'
import { all } from 'redux-saga/effects'
import reducer from "./reducers/reducer";
import LoginSaga from './sagas/LoginSaga'
import newEmployeeReducer from "./reducers/newEmployeeReducer";
import employeeReducer from "./reducers/empolyeeReduser";
import SubmitFormsWatcher from "./sagas/SubmitFormsSaga";

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
      LoginSaga(),
      SubmitFormsWatcher()
    ])
  })


export default store;
