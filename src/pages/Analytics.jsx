import React from 'react'
import { Sidebar } from '../components/Kitchen';
import {Home} from "../components/Analytics"

const Analytics = () => {
  return (
    <div className='row'>
    <div className='col-md-3'>
    <Sidebar />
    </div>
    <div className='col-md-9'>

      <Home />
    </div>
    </div>
  )
}

export default Analytics