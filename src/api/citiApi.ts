import axiosClient from "./axiosClient";

const citiApi = {
  getAll() {
    const url = '/cities';
    return axiosClient.get(url);
  }
}

export default citiApi;