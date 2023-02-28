import "./input.scss";
import React, { useContext, useEffect, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { AuthContext } from "../../Context/AuthContext";
import { ChatContext } from "../../Context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [typing, setTyping] = useState(false);
  const [buttonColor, setButtonColor] = useState("gray");

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (typing || img !== null) {
      setButtonColor("green");
    } else {
      setButtonColor("gray");
    }
  }, [typing, img]);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setTyping(false);
    setText("");
    setImg(null);
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
    if (e.target.value) {
      setTyping(true);
    } else {
      setTyping(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  return (
    <div className="input">
      <textarea
        placeholder="Message"
        onChange={handleInputChange}
        value={text}
      />
      <div className="send">
        <AttachFileIcon className="icon" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={handleImageChange}
        />
        <label htmlFor="file">
          <ImageIcon className="icon" />
        </label>
        <button
          onClick={handleSend}
          disabled={!typing && img === null}
          style={{ backgroundColor: buttonColor }}
        >
          <SendIcon className="sendIcon" />
        </button>
      </div>
    </div>
  );
};

export default Input;
