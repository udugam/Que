import axios from "axios";

export default {
    getsomething: function(){
        return axios.get("/api/cues/cues")
        // return console.log("hello")
    },
    saveCueSheet: function(cueSheet){
        return axios.post("/api/cues/cueSheet", cueSheet)
    }
}