import React from 'react'
import { useEffect } from 'react'
import router from 'next/router'
import styles from './Card.module.css'
import Link from 'next/link'

const Card = ({location}) => {

  
  return (<>
    
    <Link className={styles.wrapper} href={`/location/${location._id}`}>
       
        <div className={styles.title}>{location.title}</div>
        <div className={styles.description}>{location.description}</div>
        <img className={styles.img} src={location.location_photo_url}></img>
    </Link>    
    </>
  )
}

export default Card