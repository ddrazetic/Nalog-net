import axios from "axios";
const API_URL = "http://localhost:8080";

class ModeratorsDataService {
  getAll() {
    return axios.get(API_URL + "/moderators");
  }
}
export default new ModeratorsDataService();
