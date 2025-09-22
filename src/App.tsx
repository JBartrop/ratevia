import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
//layout imports
import MainLayout from './layout/main';
import AuthLayout from './layout/auth';
import DashboardLayout from './layout/dashboard';
//Auth imports
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import ForgottenPassword from './pages/auth/forgotten-password';
import Otp from './pages/auth/otp';
import ForgottenPasswordOtp from './pages/auth/forgotten-password-otp';
import ResetPassword from './pages/auth/reset-password';
//dashboard pages import
import Dashboard from './pages/dashboard/dashboard';
import Notifications from './pages/dashboard/notifications';
import Task from './pages/dashboard/task';
import Schedule from './pages/dashboard/schedule';
import Account from './pages/dashboard/account';
import Settings from './pages/dashboard/settings';
//pages import
import Error from './pages/error';
import Ratevia from './pages/ratevia';
//protect route
import ProtectedRoute from './components/protectedRoute';




const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children:[
      {
        path: "/",
        element: <Ratevia />
      },
    ]
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <Error />,
    children: [
      {
        path:"/dashboard",
        element: <Dashboard />
      },
      {
        path:"schedule",
        element:<Schedule />
      },
      {
        path:"task",
        element:<Task />
      },
      {
        path:"notification",
        element:<Notifications />
      },
      {
        path:"account",
        element:<Account />
      },
      {
        path:"setting",
        element:<Settings />
      },

    ]
  },
  {
    path:"/auth",
    element: <AuthLayout />,
    children:[
      {
        path:"register",
        element: <Register />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "forgotten-password",
        element: <ForgottenPassword />
      },
      {
        path: "otp",
        element: <Otp />
      },
      {
        path: "forgotten-password-otp",
        element: <ForgottenPasswordOtp />
      },
      {
        path: "reset-password",
        element: <ResetPassword />
      },
    ]
  },
  {
    path: "*",
    element: <Error />
  }
])

const App:React.FC =() => {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer autoClose={300} closeButton={true} hideProgressBar={true} position="top-center"  />
    </div>
  );
}

export default App;
