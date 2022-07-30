import { Container, Row, Col } from 'react-bootstrap';
import LatestOffers from '../LatestOffers/LatestOffers';
import WhatWeDo from './WhatWeDo/WhatWeDo'
import Reviews from './Reviews/Reviews'

import ServicesCarousel from '../ServicesCarousel/ServicesCarousel';

const Home = () => {

  return (
    <>
    <Container fluid>
      <Row>
        <Col className={`p-0`}>
          <ServicesCarousel />
        </Col>
      </Row>
    </Container>
    <Container fluid>
      <WhatWeDo />
      <Reviews />
      <LatestOffers />
    </Container>
    </>
  )
}

export default Home