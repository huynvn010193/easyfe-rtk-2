export interface PaginationParams {
  _limit : number;
  _page: number;
  _total: number;
}

// data trả về là 1 list kiểu dự liệu T bất kỳ gồm data là 1 mảng kiểu dữ liệu T và pagination
export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}


