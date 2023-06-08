import { useState, React } from 'react';
import './Login.scss';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { apiRegisterUser } from '../../services/apiAuthService';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isShowPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const handleClickBackHome = () => {
        navigate('/');
    }
    const handleClickSignUp = async () => {
        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        const isValidEmail = validateEmail(email);

        if (!isValidEmail) {
            toast.error('Invalid email');
            return;
        }
        if (!password) {
            toast.error('Invalid passwords');
            return;
        }
        let data = await apiRegisterUser(email, password, name);
        if (data && data.errorCode === 0) {
            toast.success(data.msg);
            navigate('/');
        }
        if (data && data.errorCode !== 0) {

            toast.error(data.msg);
        }
    }
    const handleClickLogin = () => {

        navigate('/login');

    }

    return (
        <div className="login-container">
            <div className="header mt-3 pr-3">
                Already have an account?
                <button className='btn btn-light ' onClick={() => handleClickLogin()}>Login</button>
            </div>
            <div className="title col-2 mx-auto">
                Register Your Account
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
                <div className="form-group pass-group">
                    <label>Password</label>
                    <input
                        id="password-field"
                        type={isShowPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)} />
                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setShowPassword(false)} ><VscEye /> </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setShowPassword(true)}><VscEyeClosed /></span>
                    }
                </div>
                <div className="form-group">
                    <label>Your Name</label>
                    <input
                        type={"text"}
                        className="form-control"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-dark" onClick={() => handleClickSignUp()}>Register to VT</button>
                </div>
                <div className='text-center'>
                    <span role={'button'} onClick={() => handleClickBackHome()}>&#60;	&#60; Go back home</span>
                </div>
            </div>
        </div >
    )
}

export default Register;