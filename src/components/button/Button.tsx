import React from "react";
import { useState, useEffect } from "react";
import styles from "./Button.module.css";
import Spinner from "../spinner/Spinner";

type ButtonType = {
	className: string;
	text: string;
};

const Button: React.FC<ButtonType> = ({ className, text }) => {
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		setIsLoading(false);
	}, [isLoading]);
	return (
		<button
			className={className}
			type="submit"
			onClick={() => {
				setIsLoading(!isLoading);
			}}
		>
			{!isLoading ? <>{text}</> : <Spinner />}
		</button>
	);
};

export default Button;
