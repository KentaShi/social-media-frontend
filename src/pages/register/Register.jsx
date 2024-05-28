import axios from "axios";
import { useRef } from "react";
import "./register.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordConfirm.current.value !== password.current.value) {
            passwordConfirm.current.setCustomValidity("Password don't match!!!")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
            }
            try {
                await axios.post("/auth/register", user);
                navigate("/login");
            } catch (err) {
                console.log(err)
            }

        }
    }
    const handleSwitchToLogin = (e) => {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">NamAnh Social</h3>
                    <span className="registerDesc">Connect with friends and the world around you on Nam Anh social.</span>
                </div>
                <div className="registerRight">
                    <form className="registerBox" onSubmit={handleSubmit}>
                        <input placeholder="Username" type="text" className="registerInput" ref={username} required />
                        <input placeholder="Email" type="email" className="registerInput" ref={email} required />
                        <input placeholder="Password" type="password" className="registerInput" ref={password} required />
                        <input placeholder="Confirm password" type="password" className="registerInput" ref={passwordConfirm} required />
                        <button className="registerButton" type="submit">Sign Up</button>
                        <button className="registerLoginButton" onClick={handleSwitchToLogin}>Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
