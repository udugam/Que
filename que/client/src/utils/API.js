import axios from "axios";


// axios can only get and post? it can't send a delete? It was sending an empty object
export default {
    getsomething: function(){
        return axios.get("/api/cues/cues")
        // return console.log("hello")
    },
    saveCueSheet: function(cueSheet){
        return axios.post("/api/cues/cueSheet", cueSheet)
    },
    getCueSheet: id =>{
        return axios.get("/api/cuesheet/"+id)
        
      },
    addShareholder: function(shareholder){
        return axios.post("/api/shareholder/add", shareholder)
    },
    deleteShareholder: function(shareholderIdAndSongId){
        return axios.post("/api/shareholder/delete", shareholderIdAndSongId)
    }
}