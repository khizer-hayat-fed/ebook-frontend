import React from 'react'
import { Sidebar } from '../components/Kitchen';
import {Home} from "../components/Order"

const OrderManagement = () => {
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

export default OrderManagement