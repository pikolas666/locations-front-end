import React from "react";
import Card from "../card/Card";
import styles from "./Cards.module.css";

type CardsType = {
	locations: Array<any> | null;
};

const Cards: React.FC<CardsType> = ({ locations }) => {
	return (
		<div className={styles.wrapper}>
			{locations &&
				locations.map((location) => (
					<Card key={location._id} location={location} />
				))}
		</div>
	);
};

export default Cards;
