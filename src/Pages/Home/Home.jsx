import React from 'react'
import "./home.scss"
import Sidebar from './../../Components/Sidebar/Sidebar';
import Chat from './../../Components/Chat/Chat';

const Home = () => {
  return (
    <div className='home'>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home