import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import styles from './Contact.module.css'

const Contact = () => {
  return (
    <Container className={styles.SectionContainer} fluid>
      <Row className={`justify-content-center align-items-center ${styles.MainDiv}`}>
        <Col className='d-flex justify-content-center'>
          <div className={styles.SectionContainerCol}>
            <h1>Contact SinaArtz</h1>
            <div>
              <h5>Reach out to us via <a href="tel:+2347057570146">call</a></h5>
              <p>OR</p>
              <a href='/messenger'>Messenger</a> <a href='whatsapp'>Whatsapp</a> <a href='mailto:jerrycul2001@gmail.com'>Mail</a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Contact