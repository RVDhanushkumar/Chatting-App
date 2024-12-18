import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register(){
    let [name,setName] = useState("");
    let [pass,setPass] = useState("");
    let [repass,setRepass] = useState("");
    let [username,setUsername] = useState("");
    const reg = async()=>{
        if(pass === repass){
            try{
                const response = await axios.post("http://localhost:3001/regration",{"name":name,"username":username,"pass":pass},{ headers: { "Content-Type": "application/json" }});
                alert(response.data);
            }
            catch(err){
                alert("Failed to enter data");
            }
        }
        else{
            alert("Password not matched...!!");
        }
    }

    return(
        <div className="Register-home">
            <div className="Reg-block">
                <form onSubmit={reg}>
                <h1>Registration form</h1>
                <label>Username:</label>
                <input type="text" 
                    placeholder="Enter name"
                    id="reg-name"
                    onChange={(e)=>{setName(e.target.value)}}></input>
                <label>Username:</label>
                <input type="text" 
                    placeholder="Enter username"
                    id="reg-username"
                    onChange={(e)=>{setUsername(e.target.value)}}></input>
                <label>Password:</label>
                <input type="text" 
                    placeholder="Enter password"
                    id="reg-pass"
                    onChange={(e)=>{setPass(e.target.value)}}></input>
                <label>Re-enter Password:</label>
                <input type="text" 
                    placeholder="Enter password"
                    id="reg-repass"
                    onChange={(e)=>{setRepass(e.target.value)}}></input>
                <button>Submit</button>
                <Link to="/"><p>Already have an account?</p></Link>
                </form>
            </div>
        </div>
    )
}

export default Register;