import {call, put, takeEvery, takeLatest} from "redux-saga/effects";
import actionTypes from "../actionTypes/actionTypes";
import {isLoading, setAuthUser, setError} from "../actionCreators/ActionCreators";
import backAPI from '../../api/index';

const API = new backAPI();

function* loginWorker(action) {
    yield put(isLoading(true));
    try {
        const data = call(API.login, action.payload);
        yield put(isLoading(false));
        if (data.status === 200) {
            const {_id, companyName, generalInfo, secret} = data;
            yield put(setAuthUser(_id, companyName, generalInfo, secret));
        }
    } catch (error) {
        yield put(isLoading(false));
        yield put(setError(error.message))
    }
}


export default function* loginWatcher() {
    yield takeEvery(actionTypes.LOGIN, loginWorker);
}


