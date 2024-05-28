import "./login.scss";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { user, isFetching, error, dispatch } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        loginCall({ email: email.current.value, password: password.current.value }, dispatch);
    }
    const handleSwitchToRegister = (e) => {
        e.preventDefault();
        navigate("/register");
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">NamAnh Social</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Nam Anh social.</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit} >
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" minLength="3" type="password" required className="loginInput" ref={password} />
                        <button type="submit" className="loginButton" disabled={isFetching} >{isFetching ? (<CircularProgress size="20px" />) : ("Log In")}</button>
                        <span className="loginForgot">Forgot Password?</span>
                        <button className="loginRegisterButton" onClick={handleSwitchToRegister}>{isFetching ? (<CircularProgress size="20px" />) : ("Create A New Account")}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
