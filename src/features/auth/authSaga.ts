import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, delay } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  console.log('handleLogin', payload);
  yield delay(2000);
  localStorage.setItem('access_token', 'fake_token');
}

function* handleLogout() {
  console.log('handleLogout');

  // Xóa access_token
  localStorage.removeItem('access_token');
}

function* watchLoginFlow() {
  // Phải để vào lòng lặp vô tận -> luôn luôn lắng nghe 2 hành động Login và Logout.
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    // Nếu chưa login thì lắng nghe LOGIN.
    if (!isLoggedIn) {
      // TODO: Đợi User dispatch 1 action Login lên -> thì thực hiện fork 1 task handleLogin
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    // TODO: Sau khi user Login xong thì watch đợi Action logout
    yield take(authActions.logout.type);
    yield fork(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
