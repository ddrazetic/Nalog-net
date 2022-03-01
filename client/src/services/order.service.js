import axios from "axios";
axios.create({
  baseURL: "axios://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  },
});

class TutorialDataService {
  getAll() {
    return axios.get("/tutorials");
  }
  get(id) {
    return axios.get(`/tutorials/${id}`);
  }
  create(data) {
    return axios.post("/tutorials", data);
  }
  update(id, data) {
    return axios.put(`/tutorials/${id}`, data);
  }
  delete(id) {
    return axios.delete(`/tutorials/${id}`);
  }
  deleteAll() {
    return axios.delete(`/tutorials`);
  }
  findByTitle(title) {
    return axios.get(`/tutorials?title=${title}`);
  }
}
export default new TutorialDataService();
