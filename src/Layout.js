import App from './App';

import Login from './components/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link,
    Routes,
    Route,
} from "react-router-dom";
import Register from './components/Auth/Register';
import ManageUsers from './components/Admin/Content/Users/ManageUsers';
import ManageRoles from './components/Admin/Content/Role/ManageRole';
import ManageCategory from './components/Admin/Content/Category/ManageCategory';
import ManageSeries from './components/Admin/Content/Series/ManageSeries';
import DashBoard from './components/Admin/Content/Dashboard/Dashboard';
import HomePage from './components/HomePage/HomePage';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import { PrivateRoute, PrivateRouteWithUser } from './routes/PrivateRoute';


const NotFound = () => {
    return (
        <div className="alert alert-danger container mt-3" role="alert">
            404.Not Found Data With Your Current URL
        </div>
    )
}

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={
                        <PrivateRouteWithUser>
                            <User />
                        </PrivateRouteWithUser>
                    } />
                </Route>
                <Route path="admins" element={
                    <PrivateRoute>
                        <Admin />
                    </PrivateRoute>
                }>
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUsers />} />
                    <Route path="manage-roles" element={<ManageRoles />} />
                    <Route path="manage-category" element={<ManageCategory />} />
                    <Route path="manage-series" element={<ManageSeries />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="*" element={<NotFound />} />

            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

        </>
    )
}

export default Layout;