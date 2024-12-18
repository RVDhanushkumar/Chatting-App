import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");

    const submit = async (event) => {
        event.preventDefault(); 
        try {
            const response = await axios.post(
                "http://localhost:3001/login",
                { name, pass },
                { headers: { "Content-Type": "application/json" } } // Set header
            );
            alert(response.data);
        } catch (error) {
            alert(error.response?.data || "Failed to login");
        }
    };

    return (
        <div className="login-home">
            <div className="login-container">
                <h1>Login</h1>
                <form onSubmit={submit}>
                    <label>Email or Username: </label><br />
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your Username"
                        onChange={(event) => setName(event.target.value)}
                        required
                    /><br />
                    <label>Password: </label><br />
                    <input
                        type="password"
                        id="pass"
                        placeholder="Enter your Password"
                        onChange={(event) => setPass(event.target.value)}
                        required
                    /><br />
                    <button type="submit">Submit</button>
                    <Link to="/register"><p>Don't have an account?</p></Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
