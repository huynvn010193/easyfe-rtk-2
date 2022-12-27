export interface PaginationParams {
  _limit : number;
  _page: number;
  _totalRows: number;
}

// data trả về là 1 list kiểu dự liệu T bất kỳ gồm data là 1 mảng kiểu dữ liệu T và pagination
export interface ListResponse<T> {
  data: T[];
  pagination: PaginationParams;
}

// Khai báo kiểu dữ liệu params
export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any
}
