import React from 'react';
import LogoutSvg from '../../Assets/Svgs/LogoutSvg';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  useDispatch } from "react-redux"
import { useLogoutMutation } from "../../store/usersSlice";
import { logout } from "../../store/authSlice";
import { toast } from "react-toastify";

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    toast.success("Logged out Successfully");
    navigate('/');
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '293px', height: '100%', position:'fixed' }}>
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <h1 style={{fontSize:'2rem !important', fontWeight:'bolder'}}>E BookBazaar</h1>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/kitchen" className={`${location?.pathname === '/kitchen' ? 'nav-link active' : 'nav-link text-white'}`} aria-current="page">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/analytics" className={`${location?.pathname === '/analytics' ? 'nav-link active' : 'nav-link text-white'}`}>
            Analytics
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/order" className={`${location?.pathname === '/order' ? 'nav-link active' : 'nav-link text-white'}`}>
            Orders
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/review" className={`${location?.pathname === '/review' ? 'nav-link active' : 'nav-link text-white'}`}>
            Reviews
          </Link>
        </li>
      </ul>
      <hr />
      <div className='d-flex justify-content-center' onClick={logoutHandler}>
        <div className='p-1' style={{ cursor: 'pointer' }}><LogoutSvg /> </div>
        <p className='p-1' style={{ cursor: 'pointer' }}>Logout</p>
      </div>
    </div>
  );
}
