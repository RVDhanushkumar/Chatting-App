import io from 'socket.io-client';
import './App.css';
import { useEffect } from 'react';

const socket = io.connect(
  process.env.NODE_ENV === "production"
    ? "wss://chatweb13.vercel.app"
    : "http://localhost:3001"
);

function App() {
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
    <div className="App">
      <div className='chat'>
        <h2>Welcome To Secret Group Chat🤫</h2>
        <div className='text1'></div>
        <input type='text' placeholder='Enter message 💖' id="text1" autoComplete="off" />
        <button onClick={sendMsg} id="btn">Send</button>
      </div>
    </div>
  );
}

export default App;
