import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery } from "redux-saga/effects";
import { increment } from "./counterSlice";

export function* log(action: PayloadAction) {
  console.log('Log', action);
}

export default function* counterSaga() {
  console.log('counterSaga');

  // Muốn lắng nghe tất cảa các action dc dispatch
  // yield takeEvery('*', log);

  // Muốn lắng nghe 1 action dc dispatch
  // yield takeEvery('counter/increment', log);
  yield takeEvery(increment().type, log);
  
}