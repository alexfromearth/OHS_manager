import { call, put, takeEvery } from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import {setError} from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* SubmitFormsWorker(action) {
  try {
    const data = yield call(API.addWorker, action.payload.companyId, action.payload.generalInfo, action.payload.profInfo);
  } catch (error) {
    yield put(setError(error.message))
  }
}


export default function* SubmitFormsWatcher() {
  yield takeEvery(actionTypes.SUBMIT_NEWEMPLOYEE_FORM, SubmitFormsWorker);
}

