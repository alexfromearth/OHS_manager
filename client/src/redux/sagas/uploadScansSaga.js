import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import backAPI from '../../api/index';
import {loadSuccess, setUpload, uploadingFailed} from "../actionCreators/ActionCreators";

const API = new backAPI();

function* UploadScansWorker(action) {
    yield put(setUpload(true))
    try {
        const data = yield call(API.uploadScans, action.payload.formData, action.payload.companyId,
            action.payload.workerId);
        debugger;
        if (data.status === 200) {
            put(loadSuccess());
        }
    } catch (error) {
        put(uploadingFailed(error.message));
    }
}


export default function* UploadScansWatcher() {
    yield takeEvery(actionTypes.UPLOADS_SCANS_SC, UploadScansWorker);
}

