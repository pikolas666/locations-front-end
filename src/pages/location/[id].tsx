import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
import styles from "./styles.module.css";
import PageTemplate from "@/components/pageTemplate/PageTemplate";
import Modal from "@/components/modal/Modal";

type LocationType = {
	_id: string;
	title: string;
	description: string;
	latitude: number;
	longitude: string;
	location_photo_url: string;
};

const Location = () => {
	const [location, setLocation] = useState<LocationType | null>(null);

	const [isShowModal, setIsShowModal] = useState(false);

	const router = useRouter();

	const fetchLocation = async (id: string) => {
		try {
			const response = await axios.get(`http://localhost:3000/locations/${id}`);
			setLocation(response.data.location);
		} catch (error) {
			console.error("Error fetching location:", error);
			// Handle the error, e.g., show an error message to the user
		}
	};

	const deleteLocation = async (id: string) => {
		try {
			const response = await axios.delete(
				`${process.env.SERVER_URL}/locations/${id}`
			);
			router.push("/");
		} catch (error) {
			console.error("Error fetching location:", error);
			// Handle the error, e.g., show an error message to the user
		}
	};

	useEffect(() => {
		router.query.id && fetchLocation(router.query.id as string);
	}, [router.query.id]);

	return (
		<PageTemplate>
			{/* reiktu mest i atskita komponenta */}
			{location && (
				<div className={styles.wrapper}>
					{isShowModal ? (
						<Modal
							setIsShowModal={setIsShowModal}
							deleteLocation={() => deleteLocation(location._id)}
						/>
					) : (
						<></>
					)}
					<h1 className={styles.title}>{location.title}</h1>
					<div className={styles.amount}>{location.description}$</div>
					<p className={styles.description}>{location.latitude}</p>
					<div className={styles.type}>{location.longitude}</div>
					<img className={styles.photo} src={location.location_photo_url} />
					<button
						className={styles.deleteButton}
						onClick={() => setIsShowModal(true)}
					>
						Delete
					</button>
				</div>
			)}
		</PageTemplate>
	);
};

export default Location;
