import React,{Component} from 'react'
import API from '../API/API.js'

class AcrCloud extends Component {
    
    launchArcCloud = ()=> {
        API.runACR()
        .then(res =>
            console.log(res)
          )
          .catch(err => console.log(err));
    } 

    render() {
        return(
            <div>
                <button onClick={() => this.launchArcCloud()}>Click to Launch ArcCloud</button>
            </div>
        )
    }
}

export default AcrCloud