import "./chat.scss";
import React, { useContext } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { ChatContext } from "../../Context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);
  console.log(data);
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <VideocamIcon className="icon" />
          <PersonAddIcon className="icon" />
          <MoreHorizIcon className="icon" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
