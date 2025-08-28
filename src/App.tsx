import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import MainLayout from './layout/main';
import Error from './pages/error';
import Dashboard from './pages/dashboard';
import AuthLayout from './layout/auth';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import ForgottenPassword from './pages/auth/forgotten-password';
import Otp from './pages/auth/otp';
import ProtectedRoute from './components/protectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children:[
      {
        path: "/",
        element: (
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
      }
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
      <ToastContainer autoClose={200} closeButton={true} hideProgressBar={true} position="top-center"  />
    </div>
  );
}

export default App;
