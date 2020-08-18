import {call, put, takeEvery} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import {isLoading, logout, setError} from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* logoutWorker() {
    yield put(isLoading(true));
    try {
        const data = yield call(API.logout);
        console.log(data);
        yield put(isLoading(false));
        if (data.status === 200) {
            yield put(logout());
        }
    } catch (error) {
        yield put(isLoading(false));
        yield put(setError(error.message))
    }
}


export default function* logoutWatcher() {
    yield takeEvery(actionTypes.LOGOUT, logoutWorker);
}
