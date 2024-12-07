import * as React from "react";
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar';
import Footer from '../Footer';

export function Layout() {
  return (
   <>
   <Navbar/>
   {/* <div style={{height:'74vh'}}> */}
    <Outlet />
   {/* </div> */}
    <Footer />
    </>
  );
}
