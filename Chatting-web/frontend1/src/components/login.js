import { useState } from "react";
import axios from "axios";
import "../style/login.css";
import pic1 from "../assets/prof_pic.jpg";
import { Link, useNavigate } from "react-router-dom";


function Login() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const submit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await axios.post(
                "http://localhost:3001/login",
                { name, pass },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.message === "Login successful") {
                alert("Login successful");
                navigate("/chatting");
            } else {
                let x = document.querySelector(".login-error");
                x.style.scale = "1px";
                let er_cover = document.querySelector(".error-cover");
                er_cover.style.zIndex = 1;
                setError(response.data.message);
            }
        } 
        catch (error) {
            let er = document.querySelector(".login-error");
            let er_cover = document.querySelector(".error-cover");
            er_cover.style.zIndex = 1;
            er.style.scale = 1;
            setError(error.response?.data.message || "Failed to login");
        }
    };
    function error_close(){
        let er = document.querySelector(".login-error");
        let er_cover = document.querySelector(".error-cover");
        er_cover.style.zIndex = -1;    
        er.style.scale = 0;
    }

    return (
        <div className="login-home">
            <div className="login-container">
                <h1>Login</h1>
                <img src={pic1} alt="img" id="pro-img"></img>
                <form onSubmit={submit}>
                    <label>Username: </label><br />
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your Username"
                        autocomplete="off"
                        onChange={(event) => setName(event.target.value)}
                        required
                    /><br />
                    <label>Password: </label><br />
                    <input
                        type="password"
                        id="pass"
                        placeholder="Enter your Password" autoComplete="off"
                        onChange={(event) => setPass(event.target.value)}
                        required
                    /><br />
                    <button type="submit">Submit</button>
                    <Link to="/register"><p>Don't have an account?</p></Link>
                </form>
            </div>
            <div className="error-cover">
                <div className="login-error">
                    <h1>Error</h1>
                    <p>{error}</p>
                    <button onClick={error_close}>Okay</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
