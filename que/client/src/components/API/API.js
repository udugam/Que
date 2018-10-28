import axios from "axios";

export default {
  // Run acr recognition
  runACR: () => {
    return axios.get("/api/acrcloud/recognize");
  },
  getCueSheet: id => {
    return axios.get("/api/cuesheet/"+id)
  },
  sendFile: () => {
    return axios.post("/api/upload")
  }
};
