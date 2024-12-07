import React from 'react';
import { Sidebar } from '../components/Admin';
import { Home } from '../components/Admin/OrderAdmin';


const OrderAdmin = () => {

  return (
    <>
         <div className='row'>
    <div className='col-md-3'>
    <Sidebar />
    </div>
    <div className='col-md-9'>
      <Home />
    </div>
    </div>
    </>
  );
};

export default OrderAdmin;
