import React, { useState, useEffect } from "react";
import "./Message.css";

function MessageAlert({type, message, duration = 500}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the alert with the slide-in animation
    setIsVisible(true);

    // Automatically hide the alert after the specified duration
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    // Cleanup timer on component unmount or onClose
    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div className={`alert ${isVisible ? "slide-in" : "slide-out"} ${type}`}>
      <p>{message}</p>
      <button className="close-btn" onClick={handleClose}><img src="./icons/cancel-black.svg" className="icon"/></button>
    </div>
  );
}

export default MessageAlert;
