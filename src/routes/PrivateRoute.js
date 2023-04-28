import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { checkRole } from "../utils/checkRole";
import { useState } from "react";
import { checkToken } from "../services/apiAuthService";


const PrivateRoute = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const access_token = useSelector(state => state.user.account.access_token);
    const [role, setRole] = useState('')

    const checkRole = async (access_token) => {

        let res = await checkToken(access_token);

        setRole(res.data.role)

    }
    useEffect(() => {
        checkRole(access_token)

    }, [])
    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }
    if (isAuthenticated && role !== 'admin') {
        return (
            <div className="alert alert-danger container mt-3" role="alert">
                404.Not Found Data With Your Current URL
            </div>
        )
    }


    return (
        <>
            {props.children}
        </>
    )
}
const PrivateRouteWithUser = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const access_token = useSelector(state => state.user.account.access_token);
    const [role, setRole] = useState('')

    const checkRole = async (access_token) => {

        let res = await checkToken(access_token);

        setRole(res.data.role)

    }

    useEffect(() => {
        checkRole(access_token)

    }, [])
    if (!isAuthenticated) {
        return <Navigate to='/login' />;
    }
    return (
        <>
            {props.children}
        </>
    )
}
export {
    PrivateRoute,
    PrivateRouteWithUser

};