import React, { useContext } from "react";
import "./navbar.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">
        <img src={currentUser.photoURL} />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Log Out</button>
      </div>
    </div>
  );
};

export default Navbar;
