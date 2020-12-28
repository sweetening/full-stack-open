import React from "react";

const Notification = ({ message, isErrorMessage = false }) => {
  const notification = isErrorMessage ? "error" : "notification";
  return <p className={notification}>{message}</p>;
};

export default Notification;
