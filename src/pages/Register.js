import React, { useState, useEffect } from 'react';
import signinlogo from '../Assets/Logo.jpg';
import { Link } from 'react-router-dom';
import { useRegisterMutation } from "../store/usersSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    type: '',
    password: '',
    confirmPassword: '',
    name:''
  });

  const [register, { isLoading, isSuccess, }] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.type || !formData.password || !formData.confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (formData?.password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    const data = await register(formData)

    if (data?.error?.status !== 201) {
      toast.error(data?.error?.data?.message);
    }
    
  };

  useEffect(()=>{
    if(isSuccess){
      toast.success("Successfully Created");
      navigate("/login");
  }
  },[isLoading,isSuccess])

  return (
    <div className="container signin">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-1" src={signinlogo} alt="" width={300} height={180} />
          <h1 className="h3 mb-3 fw-normal">Please Sign-up</h1>

          <h5 className="text-start mt-2" htmlFor="email">
            Email address
          </h5>
          <div className="form" bis_skin_checked={1}>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group" bis_skin_checked={1}>
            <h5 className="text-start mt-2" htmlFor="position">
              Select position
            </h5>
            <select
              className="form-control"
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">Select position</option>
              <option value="manager">Manager</option>
              <option value="customer">Customer</option>
            </select>
          </div>

          {formData?.type === 'manager' && (
            <>
          <h5 className="text-start mt-2" htmlFor="name">
          Shop Name
        </h5>
        <div className="form" bis_skin_checked={1}>
          <input
            type="text"
            className="form-control"
            placeholder="Shop Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>  
            </>
          )}

          <h5 className="text-start mt-2" htmlFor="password">
            Password
          </h5>
          <div className="form" bis_skin_checked={1}>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <h5 className="text-start mt-2" htmlFor="confirmPassword">
            Confirm Password
          </h5>
          <div className="form" bis_skin_checked={1}>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
          </div>


          <button disable={isLoading} className="btn btn-primary w-100 py-2 mt-3" type="submit">
          {isLoading ? "Loading..." : "Sign Up"}
          </button>

          <p>Already have account? <Link to={'/login'}>Login</Link></p>
        </form>
      </main>
    </div>
  );
};

export default Register;
