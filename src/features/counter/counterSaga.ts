import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import { incrementSaga, incrementSagaSuccess } from "./counterSlice";

// export function* log(action: PayloadAction) {
//   console.log('Log', action);
// }

function* handleIncrementSaga(action: PayloadAction<number>) {
  // wait 2s
  yield delay(2000);
  console.log('Waiting done, dispatch action');
  yield put(incrementSagaSuccess(action.payload));
} 

export default function* counterSaga() {
  console.log('counterSaga');

  // Muốn lắng nghe tất cảa các action dc dispatch
  // yield takeEvery('*', log);

  // Muốn lắng nghe 1 action dc dispatch
  // yield takeEvery('counter/increment', log);

  // yield takeLatest(incrementSaga.toString(), handleIncrementSaga);
  yield takeEvery(incrementSaga.toString(), handleIncrementSaga);
  
}