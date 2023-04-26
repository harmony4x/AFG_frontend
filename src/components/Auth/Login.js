import { useState } from 'react';
import './Login.scss';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { apiLoginUser } from '../../services/apiAuthService';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickBackHome = () => {
        navigate('/');
    }
    const handleClickSignUp = () => {
        navigate('/register');
    }
    const handleClickLogin = async () => {
        let data = await apiLoginUser(email, password);

        if (data && data.errorCode === 0) {
            dispatch(
                doLogin(data)
            )
            toast.success(data.EM);
            navigate('/');
        }
        if (data && data.errorCode !== 0) {
            toast.error(data.msg);
        }
    }
    return (
        <div className="login-container">
            <div className="header mt-3 pr-3">
                Don't have an account yet?
                <button className='btn btn-light ' onClick={() => handleClickSignUp()}>Sign up</button>
            </div>
            <div className="title col-2 mx-auto">
                Login Your Account
            </div>
            <div className="welcome col-2 mx-auto">
                Hello, who’s this?
            </div>
            <div className="content col-2 mx-auto">
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type={"email"}
                        className="form-control"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={"password"}
                        className="form-control"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />

                </div>
                <span className="forgot-password">Forgot password?</span>
                <div className="form-group">
                    <button className="btn btn-dark" onClick={() => handleClickLogin()}>Login to VT</button>
                </div>
                <div className='text-center'>
                    <span role={'button'} onClick={() => handleClickBackHome()}>&#60;	&#60; Go back home</span>
                </div>
            </div>
        </div>
    )
}

export default Login;