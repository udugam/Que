import React from 'react'
import AcrCloud from '../../components/ACRCloud/AcrCloud.js'
import WelcomeUser from '../../components/WelcomeUser/WelcomeUser.js'

const Home = ()=> (
    <div>
        <WelcomeUser />
        <h1>This is the home page!</h1>
        <AcrCloud />
    </div>
)

export default Home