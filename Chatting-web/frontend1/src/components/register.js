import axios from "axios";
import { useState } from "react";
import "../style/register.css";
import { Link, useNavigate } from "react-router-dom";

function Register(){
    let [name,setName] = useState("");
    let [pass,setPass] = useState("");
    let [repass,setRepass] = useState("");
    let [username,setUsername] = useState("");
    let [error,setError] = useState("");

    const navigate = useNavigate();
    const reg = async(e)=>{
        e.preventDefault();
        if(pass === repass){
            try{
                const response = await axios.post("http://localhost:3001/register",{name,username,pass},{ headers: { "Content-Type": "application/json" }});
                if(response.data.message === "User registered successfully"){
                    alert(response.data.message);
                    navigate("/");
                }
                else{
                    setError(response.data.message);
                }
            }
            catch(err){
                setError("Failed to enter data");
            }
        }
        else{
            setError("Password not matched...!!");
        }
    }

    function error_close(){
        let er = document.querySelector(".login-error");
        let er_cover = document.querySelector(".error-cover");
        er_cover.style.zIndex = -1;    
        er.style.scale = 0;
    }

    return(
        <div className="Register_home">
            <div className="Reg_block">
                <form onSubmit={reg}>
                <h1>Registration form</h1>
                <label>Name:</label><br></br>
                <input type="text" 
                    placeholder="Enter name"
                    id="reg-name"
                    onChange={(e)=>{setName(e.target.value)}} required></input><br></br>
                <label>Username:</label><br></br>
                <input type="text" 
                    placeholder="Enter username"
                    id="reg-username"
                    onChange={(e)=>{setUsername(e.target.value)}} required></input><br></br>
                <label>Password:</label><br></br>
                <input type="password" 
                    placeholder="Enter password"
                    id="reg-pass"
                    onChange={(e)=>{setPass(e.target.value)}} required></input><br></br>
                <label>Re-enter Password:</label><br></br>
                <input type="password" 
                    placeholder="Re-enter password"
                    id="reg_repass"
                    onChange={(e)=>{setRepass(e.target.value)}} required></input><br></br>
                <button>Submit</button><br></br>
                <Link to="/"><p>Already have an account?</p></Link>
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
    )
}

export default Register;