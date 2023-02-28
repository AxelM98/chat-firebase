import "./message.scss";
import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  /*   function convertDateToTime(dateObj) {
    const date = new Date(
      dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000
    );
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } */

  function convertDateToTime(dateObj) {
    const date = new Date(
      dateObj.seconds * 1000 + dateObj.nanoseconds / 1000000
    );
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
    if (diffInDays === 0) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (diffInDays === 1) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `yesterday ${hours}:${minutes}`;
    } else {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  }

  const timestamp = convertDateToTime(message.date);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img className="image"
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
        />
        <span className="timestamp" >{timestamp}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} />}
      </div>
    </div>
  );
};

export default Message;
