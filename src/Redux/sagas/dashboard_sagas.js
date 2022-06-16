import { put, takeEvery } from 'redux-saga/effects'
import { LoaderTypes } from '../action_types/loader_types'
import { DashboardTypes } from '../action_types/dashboard_types'
import axios from 'axios'
import { AuthTypes } from "../action_types/auth_types";

function* dashboardData() {
    yield put({ type: LoaderTypes.LOADER_START })

    try {
        const url = "https://reqres.in/api/users"
        const res = yield axios.get(url)
        yield put({ type: DashboardTypes.USER_DATA_REQUEST_SUCCESS, data: res.data.data })
    }
    catch (e) {

    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}
function* Post({ data, callback }) {
    yield put({ type: LoaderTypes.LOADER_START });
    try {
        const url = "https://reqres.in/api/users";
        // const url = `${process.env.REACT_APP_API_URL}/${URI.LOGIN}`;
        const res = yield axios.post(url, data);
        yield put({ type: AuthTypes.POST_SUCCESS, data: res.data });
        callback();
    } catch (e) {
        callback(true);
    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}
//user request by id
function* userRequest(data, callback) {
    console.log('da', data.data.id);
    yield put({ type: LoaderTypes.LOADER_START })

    try {
        const url = `https://reqres.in/api/users/${data.data.id}`
        // // const url = `${process.env.REACT_APP_API_URL}/users`
        const res = yield axios.get(url)
        yield put({ type: DashboardTypes.PERSON_REQUST_SUCCESS,data:res.data.data })
        callback(true);
    }
    catch (e) {

    }
    yield put({ type: LoaderTypes.LOADER_STOP });
}

export default function* dashboardSaga() {
    yield takeEvery(DashboardTypes.USER_DATA_REQUEST, dashboardData);
    yield takeEvery(DashboardTypes.PERSON_REQUST, userRequest);
    yield takeEvery(AuthTypes.POST_REQUEST, Post);
}