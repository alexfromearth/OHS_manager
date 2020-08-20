import { call, put, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import { isLoading, setAuthUser, setError } from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* isUserAuthenticatedWorker(action) {
  yield put(isLoading(true));
  try {
    const data = yield call(API.isUserAuthenticated);
    yield put(isLoading(false));
    if (data.status === 200) {
      const { _id, companyName, generalInfo, secret } = data.company;
      yield put(setAuthUser(_id, companyName, generalInfo, secret));
    } else {
      yield put(setError(data.msg));
    }
  } catch (error) {
    yield put(isLoading(false));
    yield put(setError(error.message))
  }
}


export default function* isUserAuthenticatedWatcher() {
  yield takeEvery(actionTypes.AUTH, isUserAuthenticatedWorker);
}
