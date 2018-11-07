import axios from "axios";

export default {
  getCueSheet: id => {
    return axios.get("/api/cuesheet/"+id)
  }
};
