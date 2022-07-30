import { Container, Row, Col } from 'react-bootstrap'
import OfferCard from '../OfferCard/OfferCard'
import LatestOffers from '../LatestOffers/LatestOffers'
import styles from './Offers.module.css'
import { useQuery } from 'react-query'
import offersBackend from '../../backend/offers.backend'
import { useEffect } from 'react'
import Loader from '../Loader/Loader'
import AlertS from '../AlertS/AlertS'

const Offers = (props) => {

  const offers = useQuery(['offers', props.sectionHash], offersBackend.getOffersBySection)

  useEffect(() => {
    window.scrollTo(0,0)
  }, [offers])

  const loadOffers = (offers) => {
    let display;
    if (offers.length) {
        display = offers.map(offer => (
            <Col key={offer.uhash} xs={12} md={4} lg={3}>
                <OfferCard offer={offer} />
            </Col>
        ))
    } else {
        display = <p>No offers for {props.title}</p>
    }
    return display
  }

  return (
    <Container className={styles.MainDiv} fluid>
        <Row>
            <Col className='my-3'>
                <h1>Offers for {props.title}</h1>
            </Col>
        </Row>
        <Row className={`g-3 mb-5`}>
            {
                offers.isLoading ? <Loader display='block' /> : ''
            }
            {
                offers.isError && <AlertS noTitle={true}/>
            }
            { offers.isSuccess && loadOffers(offers.data) }
        </Row>
        <LatestOffers />
    </Container>
  )
}

export default Offers