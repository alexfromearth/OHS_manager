import {call, put, takeEvery} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import backAPI from '../../api/index';
import {loadSuccess, setUpload, uploadingFailed} from "../actionCreators/ActionCreators";


const API = new backAPI();


function* SeedDBWorker(action) {
  yield put(setUpload(true))
  try {
    const data = yield call(API.seedDataBase, action.payload.formData);
    if (data.status === 200) {
      yield put(loadSuccess());
    }
  } catch (error) {
    yield put(setUpload(false));
    yield put(uploadingFailed(error.message));
  }
}


export default function* SeedDBWatcher() {
  yield takeEvery(actionTypes.SEED, SeedDBWorker);
}

