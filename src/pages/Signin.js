
import React, { useState } from 'react';
import signinlogo from '../Assets/Logo.jpg';
import { Link } from 'react-router-dom';
import { useLoginMutation } from "../store/usersSlice";
import { useNavigate  } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../store/authSlice";
import { toast } from "react-toastify";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password.');
      return;
    }

    const response = await login(formData);
   
    if(response?.data){
      // Check for other conditions and navigate accordingly
      dispatch(setCredentials({ ...response?.data }));
      toast.success("You have logged in successfully");

      if(response?.data?.type === 'manager'){
        navigate('/kitchen');
      } else if(response?.data?.type === 'customer'){
        navigate(-1);
      }else{
        navigate('/admin');
      }
    };

    if (response?.error?.status) {
      // Display the error message for invalid email or password
      toast.error(response?.error?.data?.message);
      return; // Exit the function to prevent further execution
    }
    }

  return (
    <div className="container signin">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-1" src={signinlogo} alt="" width={300} height={180} />
          <h1 className="h3 mb-3 fw-normal">Please Log-in</h1>

          <h6 className="text-start">
            Email address
          </h6>
          <div className="form" bis_skin_checked={1}>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <h6 className="text-start mt-2">
            Password
          </h6>
          <div className="form" bis_skin_checked={1}>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>


          <button className="btn btn-primary w-100 py-2 mt-3" type="submit">
            Sign in
          </button>

          <p>Does not have account? <Link to={'/signup'}>Register Here</Link></p>
        </form>
      </main>
    </div>
  );
};

export default Signin;
