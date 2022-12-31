import studentApi from "api/studentApi";
import citiApi from "api/citiApi";
import { ListResponse, Student, City } from "models";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { dashboardActions, RankingByCity } from "./dashboardSlice";

function* fetchStatistics(){
  // Trả về 1 mảng list response Student - trường hợp all đây là blocking vì call: là blocking
  const responseList: Array<ListResponse<Student>> = yield all([
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'male' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, gender: 'female' }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(studentApi.getAll, { _page: 1, _limit: 1, mark_lte: 5 }),
  ]);

  const statisticsList = responseList.map(x => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

  yield put(
    dashboardActions.setStatistics({
      maleCount,
      femaleCount,
      highMarkCount,
      lowMarkCount
    })
  )
}

function* fetchHighestStudentList(){
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, { 
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc'
  });

  // Sau khi xong thì dispatch action lên update State.
  yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList(){
  const { data }: ListResponse<Student> = yield call(studentApi.getAll, { 
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'asc'
  });

  // Sau khi xong thì dispatch action lên update State.
  yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList(){
  // Fetch city List
  const { data: cityList }: ListResponse<City> = yield call(citiApi.getAll);
  
  // Fetcdh ranking per city
  const callList = cityList.map((x) => call(studentApi.getAll, { 
    _page: 1,
    _limit: 5,
    _sort: 'mark',
    _order: 'desc',
    city: x.code
  }));

  const responseList: Array<ListResponse<Student>> = yield all(callList);

  const rankingByCityList: Array<RankingByCity> = responseList.map((x, idx) => { 
    return ({ 
    cityId: cityList[idx].code,
    cityName: cityList[idx].name,
    rankingList: x.data
  })})

  // update State
  yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
  // 4 api chạy song song -> ai xong trước chạy trước
  try {
    yield all([
      call(fetchStatistics),
      call(fetchHighestStudentList),
      call(fetchLowestStudentList),
      call(fetchRankingByCityList)
    ]);
    yield put(dashboardActions.fetchDataSuccess());
  } catch (error) {
    console.log('Failed to fetch dashboard data', error);
    yield put(dashboardActions.fetchDataFailed());
  }
}

export default function* dashboardSaga() {
  yield takeLatest(dashboardActions.fetchData.type, fetchDashboardData)
}