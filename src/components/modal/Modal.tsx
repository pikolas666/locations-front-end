import React from "react";
import styles from "./Modal.module.css";
import { useRouter } from "next/router";

type ModalType = {
	deleteLocation: () => void;
	setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: React.FC<ModalType> = ({ deleteLocation, setIsShowModal }) => {
	const router = useRouter();

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.x}
				onClick={() => {
					setIsShowModal(false);
				}}
			>
				X
			</div>
			<h2>Delete Location?</h2>
			<button
				className={styles.button}
				onClick={() => {
					deleteLocation();
					setIsShowModal(false);
				}}
			>
				Yes
			</button>
			<button
				className={styles.button}
				onClick={() => {
					setIsShowModal(false);
				}}
			>
				No
			</button>
		</div>
	);
};

export default Modal;
