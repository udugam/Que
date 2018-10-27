import axios from "axios";

export default {
  // Run acr recognition
  runACR: function() {
    return axios.get("/api/acrcloud/recognize");
  },
  getCueSheet: id =>{
    return axios.get("/api/cuesheet/"+id)
    
  }
};
