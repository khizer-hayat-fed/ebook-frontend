import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Admin from '../pages/Admin';
import Customer from '../pages/Customer';
import Register from '../pages/Register';
import Kitchen from '../pages/Kitchen';
import Analytics from "../pages/Analytics";
import OrderManagement from "../pages/OrderManagement";
import { Layout } from "../components/layouts";
import { PATHS } from "../utils/routes";
import Profile from "../pages/Profile";
import Review from "../pages/Review";
import Shops from "../pages/Shops"
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import OrderHistory from "../pages/OrderHistory";
import Category from "../pages/Category"
import Items from "../pages/Items";
import OrderAdmin from "../pages/OrderAdmin";
import Report from "../pages/Report";

export const router = createBrowserRouter([
  {
    index: true,
    path: PATHS.login,
    element: <Signin />,
  },
  {
    path: PATHS.signup,
    element: <Register />,
  },
  {
    path: PATHS.kitchen,
    element: <Kitchen />,
  },
  {
    path: PATHS.analytics,
    element: <Analytics />,
  },
  {
    path: PATHS.order,
    element: <OrderManagement />,
  },
  {
    path: PATHS.review,
    element: <Review />,
  },
  {
    path: PATHS.admin,
    element: <Admin />,
  },
  {
    path: PATHS.customer,
    element: <Customer />,
  },
  {
    path: PATHS.category,
    element: <Category />,
  },
  {
    path: PATHS.items,
    element: <Items />,
  },
  {
    path: PATHS.orderAdmin,
    element: <OrderAdmin />,
  },
  {
    path: PATHS.report,
    element: <Report />,
  },
  {
    path: PATHS.index,
    element: <Layout />,
    children: [
      {
        path: PATHS.index,
        element: <Home />,
      },
      {
        path: PATHS.profile,
        element: <Profile />,
      },
      {
        path: PATHS.shops,
        element: <Shops />,
      },
      {
        path: PATHS.shopDetail,
        element: <Products />,
      },
      {
        path: PATHS.cart,
        element: <Cart />,
      },
      {
        path: PATHS.history,
        element: <OrderHistory />,
      },
    ],
  },
]);
