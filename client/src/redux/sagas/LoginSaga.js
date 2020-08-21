import { call, put, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import { isLoading, setAuthUser, setError } from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* loginWorker(action) {
  yield put(isLoading(true));
  try {
    const data = yield call(API.login, action.payload);
    yield put(isLoading(false));
    if (data.status === 200) {
      const { _id, companyName, generalInfo, secret, companyEmail, companyType, director } = data.company;
      yield put(setAuthUser(_id, companyName, generalInfo, secret, companyEmail, companyType, director));
    } else {
      yield put(setError(data.msg));
    }
  } catch (error) {
    yield put(isLoading(false));
    yield put(setError(error.message))
  }
}


export default function* loginWatcher() {
  yield takeEvery(actionTypes.LOGIN, loginWorker);
}


