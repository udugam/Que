import axios from "axios";

export default {
    getsomething: function(){
        return axios.get("/api/cues/cues")
        // return console.log("hello")
    }
}