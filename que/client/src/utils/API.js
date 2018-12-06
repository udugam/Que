import axios from "axios";


// axios can only get and post? it can't send a delete? It was sending an empty object
export default {
    getCues: function(email){
        return axios.get("/api/cues/" + email)
    },
    getAllInfo: function(id){
        return axios.get("/api/cues/all/" + id)
    },
    saveCueSheet: function(cueSheet){
        return axios.post("/api/cues/cueSheet", cueSheet)
    },
    getCueSheet: id =>{
        return axios.get("/api/cuesheet/"+id)
        
      },
    addShareholder: function(shareholder){
        return axios.post("/api/shareholder/add", shareholder).then((res)=>{
            console.log(res)
        })
    },
    deleteShareholder: function(shareholderIdAndSongId){
        return axios.post("/api/shareholder/delete", shareholderIdAndSongId)
    },
    addCue: function(cueDetails){
        return axios.post("/api/cues/new", cueDetails)
    },
    deleteCue: function(cueId){
        return axios.post("/api/cues/delete", cueId)
    },
    editCue: function(cueData){
        return axios.post("/api/cues/edit", cueData)
    },
    getSongs: function(){
        return axios.get("/api/shareholder/get/")
    },
    deleteCueSheet: function(id){
        console.log(id, "-------------")
        return axios.post("/api/cueSheet/delete/" + id)
    }
}