import "./messages.scss";
import Message from "../Message/Message";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [numMessagesDisplayed, setNumMessagesDisplayed] = useState(20);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages.reverse());
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleFetchEarlierMessages = () => {
    setNumMessagesDisplayed((prevNum) => prevNum + 20);
  };

  const latestMessages = messages.slice(0, numMessagesDisplayed).reverse(); // Reverse the order of the sliced messages array to display the latest messages first

  return (
    <div className="messages">
      {latestMessages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      {numMessagesDisplayed < messages.length && (
        <button className="btn" onClick={handleFetchEarlierMessages}>
          Earlier
        </button>
      )}
    </div>
  );
};

export default Messages;
