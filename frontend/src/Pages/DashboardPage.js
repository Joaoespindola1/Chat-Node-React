import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Toast function (replace with a proper toast notification library if needed)
const makeToast = (type, message) => {
  alert(`${type}: ${message}`);  // Replace this with your toast notification logic
};

const DashboardPage = (props) => {
  const [chatrooms, setChatrooms] = React.useState([]);
  const chatroomNameRef = React.useRef();  // useRef instead of createRef

  const getChatrooms = () => {
    axios
      .get("http://localhost:8000/chatroom", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("CC_Token"),
        },
      })
      .then((response) => {
        setChatrooms(response.data);
      })
      .catch((err) => {
        setTimeout(getChatrooms, 3000);
      });
  };

  React.useEffect(() => {
    getChatrooms();
  }, []);

  const createChatroom = () => {
    const chatroomName = chatroomNameRef.current.value;

    axios
      .post(
        "http://localhost:8000/chatroom",
        { name: chatroomName },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("CC_Token"),
          },
        }
      )
      .then((response) => {
        getChatrooms();
        chatroomNameRef.current.value = "";
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
        }
      });
  };

  return (
    <div className="card">
      <div className="cardHeader">Chats</div>
      <div className="cardBody">
        <div className="inputGroup">
          <label htmlFor="chatroomName">Chatroom Name</label>
          <input
            type="text"
            name="chatroomName"
            id="chatroomName"
            ref={chatroomNameRef}
            placeholder="Chat dos cria"
          />
        </div>
      </div>
      <button onClick={createChatroom}>Criar chat</button>
      <div className="chatrooms">
        {chatrooms.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div className="chat">{chatroom.name}</div>
            <Link to={`/chatroom/${chatroom._id}`}>
              <div className="join">Join</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
