import React from "react";
import styles from "./Message.module.css";

interface MessageProps {
	type: "success" | "error";
	text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
	return <div className={`${styles.message} ${styles[type]}`}>{text}</div>;
};

export default Message;
