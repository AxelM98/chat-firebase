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
      doc.exists() && setMessages(doc.data().messages.reverse()); // Reverse the order of the messages array
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
        <button className="earlierBtn" onClick={handleFetchEarlierMessages}>
           Earlier
        </button>
      )}
    </div>
  );
};

export default Messages;

/* import "./messages.scss";
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
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  const handleFetchEarlierMessages = () => {
    setNumMessagesDisplayed((prevNum) => prevNum + 20); // Increment numMessagesDisplayed by 20 to fetch an additional set of earlier messages
  };

  const earlierMessages = messages.slice(0, numMessagesDisplayed); // Slice the messages array to only show the first numMessagesDisplayed messages

  return (
    <div className="messages">
      {earlierMessages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
      {numMessagesDisplayed < messages.length && ( // Only show the "Fetch earlier messages" button if there are still messages left to display
        <button onClick={handleFetchEarlierMessages}>
          Fetch earlier messages
        </button>
      )}
    </div>
  );
};

export default Messages; */

/* import "./messages.scss";
import Message from "../Message/Message";
import { ChatContext } from "../../Context/ChatContext";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages.slice(-20));
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

   return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
 */
