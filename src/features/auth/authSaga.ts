import { PayloadAction } from '@reduxjs/toolkit';
import { fork, take, delay, call, put } from 'redux-saga/effects';
import { LoginPayload, authActions } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    yield delay(500);
    localStorage.setItem('access_token', 'fake_token');
    
    // Sau khi login xong thì dispatch action login Success lên store.
    yield put(authActions.loginSuccess({
      id: 1,
      name: 'Easy FrontEnd'
    }));
  // redirect Admin page

  } catch (error) {
    yield put(authActions.loginFailed("error"));
  }
}

function* handleLogout() {
  yield delay(500);

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

    // TODO: Sau khi user Login xong thì watch đợi Action logout -> dùng take.
    yield take(authActions.logout.type);

    // Phải remove logout trước thì mới lắng nghe -> dùng call (cần xem lại).
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
