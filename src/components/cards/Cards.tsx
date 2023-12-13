import React from 'react'
import Card from '../card/Card'
import styles from './Cards.module.css'

const Cards = ({ locations }) => {
    return (
      <div className={styles.wrapper}>
        {locations.map((location) => (
          <Card key={location._id} location={location} />
        ))}
      </div>
    );
  };
  

export default Cards