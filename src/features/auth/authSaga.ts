import { PayloadAction } from "@reduxjs/toolkit";
import { fork, take } from "redux-saga/effects";
import { LoginPayload, authActions } from "./authSlice";

function* handleLogin(payload: LoginPayload) {
  console.log('handleLogin', payload);
}

function* handleLogout() {
  console.log('handleLogout');
}

function* watchLoginFlow() {
  // Phải để vào lòng lặp vô tận -> luôn luôn lắng nghe 2 hành động Login và Logout
  while(true) {
    // TODO: Đợi User dispatch 1 action Login lên -> thì thực hiện fork 1 task handleLogin
    const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
    yield fork(handleLogin, action.payload);

    // TODO: Sau khi user Login xong thì watch đợi Action logout
    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}