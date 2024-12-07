import React from 'react';
import { Sidebar } from '../components/Admin';
import { Home } from '../components/Admin/Category';


const Category = () => {

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

export default Category;
