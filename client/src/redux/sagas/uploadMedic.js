import {call, put, takeEvery} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import backAPI from '../../api/index';
import { setUpload, uploadingFailed} from "../actionCreators/ActionCreators";


const API = new backAPI();


function* UploadMedicWorker(action) {
  yield put(setUpload(true))
  try {
    const data = yield call(API.uploadMeds, action.payload.formData, action.payload.dateOf, action.payload.type, action.payload.companyId,
      action.payload.workerId);
  } catch (error) {
    yield put(uploadingFailed(error.message));
  }
}


export default function* UploadMedicWatcher() {
  yield takeEvery(actionTypes.UPLOADS_MEDS_SC, UploadMedicWorker);
}

