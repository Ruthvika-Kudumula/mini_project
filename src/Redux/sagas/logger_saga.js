import { select, takeEvery } from "redux-saga/effects";

function* log(action) {
  const state = yield select();

  // console.log("%c Action", "color: blue;", action.type, state);
}

export default function* LoggerSaga() {
  yield takeEvery("*", log);
}
