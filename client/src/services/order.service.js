import axios from "axios";
const API_URL = "http://localhost:8080/api";
// const API_URL = "http://192.168.0.118:8080/api";

class OrderDataService {
  getAll() {
    return axios.get(API_URL + "/orders");
  }
  getAllCountries() {
    return axios.get(API_URL + "/countries");
  }
  get(id) {
    return axios.get(`${API_URL}/orders/${id}`);
  }
  create(data) {
    return axios.post(API_URL + "/orders", data);
  }
  update(id, data) {
    return axios.put(`${API_URL}/orders/${id}`, data);
  }
  delete(id) {
    return axios.delete(`${API_URL}/orders/${id}`);
  }
  deleteAll() {
    return axios.delete(`${API_URL}/orders`);
  }
}
export default new OrderDataService();
