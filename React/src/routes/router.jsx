import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "../components/GuestLayout";
import SignUp from "../views/SignUp";
import Login from "../views/Login";
import Dashboard from "../views/Dashboard";
import MainLayout from "../components/MainLayout";
import User from "../views/User";
import NotFound from "../views/NotFound";
import Profile from "../views/Profile";
import Auth from "../views/Auth";

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/user"/>
            },           
            {
                path: '/signUp',
                element: <SignUp />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/auth',
                element: <Auth />
            },
        ]
    },
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/user',
                element: <User/>
            }, 
            {
                path: '/profile',
                element: <Profile/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    }

]);

export default router;