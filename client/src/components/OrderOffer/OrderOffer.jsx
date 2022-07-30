import { useEffect, useState } from 'react'
import { Container, Row, Col, Carousel, Nav } from 'react-bootstrap'
import LatestOffers from '../LatestOffers/LatestOffers'
import OrderDescription from './OrderDescription/OrderDescription'
import OrderForm from './OrderForm/OrderForm'
import styles from './OrderOffer.module.css'

const OrderOffer = (props) => {
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    window.scrollTo(0,0)
  })
  
  return (
    <>
    <Container className={`${styles.MainDiv} p-0 m-0`} fluid>
        <Row className='g-0'>
            <Col xs={12} lg={7}>
              <Carousel controls={false} className='bg-dark' fade>
                {
                  props.offer.imgurl.map((url, index) => 
                    (
                      <Carousel.Item className={styles.OfferImage} style={{backgroundImage: `url(${url})`}} key={index}></Carousel.Item>
                    )
                  )
                }
                </Carousel>
            </Col>
            <Col>
              <Nav className={styles.NavTab} variant='tabs' fill justify>
                <Nav.Item onClick={() => setFormVisible(false)}>
                  <Nav.Link as='h5' active={formVisible ? undefined : true} className={styles.NavLink}>Description</Nav.Link>
                </Nav.Item>
                <Nav.Item onClick={() => setFormVisible(true)}>
                  <Nav.Link as='h5' active={formVisible ? true : undefined} className={styles.NavLink}>Place Order</Nav.Link>
                </Nav.Item>
              </Nav>
              <div className={styles.OrderDetails}>
                {
                  formVisible ? <OrderForm/> : <OrderDescription offer={props.offer} />
                }
              </div>
            </Col>

        </Row>
    </Container>
    <Container className='my-5' fluid>
      <LatestOffers />
  </Container>
  </>
  )
}

export default OrderOffer