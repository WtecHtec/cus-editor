import React from 'react';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <div onClick={() => alert('Home click')}>
        Home, This is wbh's ssr demo
      </div>
      <Link to='/text'>跳转到 text</Link>
    </div>
  )
}
export default Home