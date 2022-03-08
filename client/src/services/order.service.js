import axios from "axios";
const API_URL = "http://localhost:8080/api";

class OrderDataService {
  getAll() {
    return axios.get(API_URL + "/orders");
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
