import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';

export interface CitiState {
  loading: boolean;
  list: City[];
}

const initialState: CitiState = {
  loading: false,
  list: [],
};

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      state.list = action.payload.data;
    },
    fetchCityListFailed(state) {
      state.loading = true;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// Selector
export const selectCityList = (state: RootState) => state.city.list;

// Tạo 1 selector trên đây luôn
export const selectCityMap = createSelector(selectCityList, (cityList) =>
  cityList.reduce((map: { [key: string]: City }, city) => {
    map[city.code] = city;
    return map;
  }, {})
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
