import React from 'react'
import { Row, Col } from 'react-bootstrap'
import OfferCard from '../OfferCard/OfferCard'
import styles from './LatestOffers.module.css'
import { useQuery } from 'react-query'
import offersBackend from '../../backend/offers.backend'
import Loader from '../Loader/Loader'
import AlertS from '../AlertS/AlertS'

const LatestOffers = () => {

  const offers = useQuery('latestOffers', offersBackend.getLatestOffers)

  return (
    <>
        <Row className={styles.FirstRow}>
            <Col>
                <h2 className='text-center'>Check these out</h2>
            </Col>
        </Row>
        <Row className={`${styles.SecondRow} g-3`}>
            {
                offers.isError && <AlertS noTitle={true}/>
            }

            {
                offers.isLoading ? <Loader display='block'/> : ''
            }
            
            {
                offers.isSuccess ? offers.data.map(offer => (
                    <Col key={offer.uhash} xs={12} sm={6} md={4} lg={3}>
                        <OfferCard offer={offer} />
                    </Col>
                )) : ''
            }
        </Row>
    </>
  )
}

export default LatestOffers