import React from 'react'
import { Button, Card } from 'react-bootstrap'
import styles from './OfferCard.module.css'
import {useUpdateMainContext} from '../../contexts/MainContext'

const OfferCard = (props) => {
  const {openOrderView} = useUpdateMainContext()
  return (
    <Card className={`${styles.OffersCard}`}>
        <div className={`${styles.OffersCardImageBox}`} style={{backgroundImage: `url(${props.offer.imgurl[0]})`}}></div>
        <Card.Body>
            <Card.Title as='h5'>{props.offer.title}</Card.Title>
            <Card.Text>{props.offer.short_description}</Card.Text>
            <Button onClick={() => openOrderView(props.offer)} variant='primary'>place order</Button>
        </Card.Body>
    </Card>
  )
}

export default OfferCard