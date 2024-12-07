import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../store/usersSlice";
import { logout } from "../store/authSlice";
import { toast } from "react-toastify";
import CartSvg from "../Assets/Svgs/CartSvg";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const _id = useSelector((state) => state?.user?.userInfo?._id);
  const type = useSelector((state) => state?.user?.userInfo?.type);
  const countState = useSelector((state) => state?.cartCount);

  const logoutHandler = async () => {
    await logoutApiCall().unwrap();
    dispatch(logout());
    toast.success("Logged out Successfully");
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light fixed-top bg-light py-3 px-5"
      aria-label="Fifth navbar example"
    >
      <div className="container-fluid">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center col-md-3 mb-md-0 text-decoration-none text-danger"
        >
          <h1 className="fw-bolder">E BookBazaar</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
                  <Link to="/" className="nav-link px-2 link-dark">
                    <h5>Home</h5>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/shops" className="nav-link px-2 link-dark">
                    <h5>Shops</h5>
                  </Link>
                </li>
                {_id && (
                <li className="nav-item">
                  <Link to="/cart" className="nav-link px-2 link-dark">
                    <h5 className="position-relative">
                      <CartSvg />
                      {countState > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {countState}
                      </span>
                      )}
                    </h5>
                  </Link>
                </li>
                )}
          </ul>
          <form className="d-flex">
            {_id ? (
              <>
                {type === "customer" && (
                  <>
                    <li
                      className="nav-item dropdown"
                      style={{ listStyleType: "none" }}
                    >
                      <i
                        className="fa-solid fa-user user-icon dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul className="dropdown-menu">
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/order-history">
                            Order History
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  {" "}
                  <button
                    type="button"
                    style={{ marginRight: "5px" }}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className="btn btn-primary">
                    Signup
                  </button>
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
