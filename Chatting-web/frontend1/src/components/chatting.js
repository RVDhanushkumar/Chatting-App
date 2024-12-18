import io from 'socket.io-client';
import '../style/chatting.css';
import pic1 from "../assets/prof_pic.jpg";
import { useEffect } from 'react';
import Contacts from './contacts';

const socket = io.connect(
  "http://localhost:3001"
);

function Chatting() {
  const sendMsg = () => {
    let x = document.querySelector("#text1");
    let n = document.querySelector(".text1");
    let z = document.createElement('div');
    z.className = "sendingtext";
    z.textContent = x.value;
    n.appendChild(z);
    n.scrollTop = n.scrollHeight;
    socket.emit("send_msg", x.value);
    x.value = "";
  };

  useEffect(() => {
    socket.on("recieve_msg", (data) => {
      let n = document.querySelector(".text1");
      let x = document.createElement('div');
      x.className = "recievingtext";
      x.textContent = data;
      n.appendChild(x);
      n.scrollTop = n.scrollHeight;
    });

    socket.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.off("recieve_msg");
      socket.off("connect_error");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="chat-home">
      <div className='chat'>
        <div className='chat-contacts'>
          <div className='heading'>
            <h1>ChatWeb</h1>
            <input type="search" placeholder='Search group'></input>
          </div>
          <div className='cont'>
            <Contacts img={pic1} name="Dhanush" des="New message"/>
            <Contacts img={pic1} name="Sai kumar" des="New message"/>
            <Contacts img={pic1} name="lalith" des="New message"/>
            <Contacts img={pic1} name="Sharmi" des="New message"/>
            <Contacts img={pic1} name="Chandu" des="New message"/>
            <Contacts img={pic1} name="Chandu" des="New message"/>
          </div>
        </div>
        <div className='chat-work'>
        <h2>Welcome To Secret Group Chat🤫</h2>
        <div className='text1'></div>
        <input type='text' placeholder='Enter message 💖' id="text1" autoComplete="off" />
        <button onClick={sendMsg} id="btn">Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatting;
