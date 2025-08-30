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
//pages import
import Error from './pages/error';
import Dashboard from './pages/dashboard';
import Ratevia from './pages/ratevia';
//protext route
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
    children: [
      {
        path:"/dashboard",
        element:(
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
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
