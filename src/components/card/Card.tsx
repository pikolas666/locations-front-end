import React from "react";
import { useEffect } from "react";
import router from "next/router";
import styles from "./Card.module.css";
import Link from "next/link";

type LocationType = {
	_id: string;
	title: string;
	description: string;
	latitude: number;
	longitude: number;
	location_photo_url: string;
	owner_id: string;
};

type CardComponentType = {
	location: LocationType;
};

const Card: React.FC<CardComponentType> = ({ location }) => {
	return (
		<>
			<Link className={styles.wrapper} href={`/location/${location._id}`}>
				<div className={styles.title}>{location.title}</div>
				<div className={styles.description}>{location.description}</div>
				<img className={styles.img} src={location.location_photo_url}></img>
			</Link>
		</>
	);
};

export default Card;
