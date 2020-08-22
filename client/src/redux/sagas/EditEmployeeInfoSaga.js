import {call, put, takeEvery} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import {clearFormInputs, isLoading, setError} from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* EditEmployeeInfoWorker(action) {
  yield put(isLoading(true));
  try {
    const data = yield call(API.editEmployeeInfo, action.payload.companyId,
      action.payload.workerId, action.payload.generalInfo, action.payload.profInfo);
    yield put(isLoading(false));
    yield put(clearFormInputs());
  } catch (error) {
    yield put(isLoading(false));
    yield put(setError(error.message))
  }
}


export default function* EditEmployeeInfoWatcher() {
  yield takeEvery(actionTypes.EDIT_EMPLOYEE_SC, EditEmployeeInfoWorker);
}


