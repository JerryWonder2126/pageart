import { Container, Row, Col } from 'react-bootstrap'
import LatestOffers from '../LatestOffers/LatestOffers'
import styles from './About.module.css'
import aboutImg from '../../assets/art.svg'
import ServicesCarousel from '../ServicesCarousel/ServicesCarousel'

const About = () => {
  return (
    <Container fluid>
        <Row className={`${styles.MainDiv} bg-dark text-light`}>
            <Col sm={12} lg={6} className=''>
              <h1  className='d-block d-lg-none text-center'>About Us</h1>
              <div className={styles.AboutImgDiv}>
                <img src={aboutImg} alt="about sinaartz" />
              </div>
            </Col>
            <Col className={`${styles.AboutText} p-3`}>
                <h1 className='d-none d-lg-block'>About Us</h1>
                <div className='text-justify'>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est commodi eum eos,
                    neque illum perspiciatis consequuntur incidunt laborum dignissimos ullam 
                    aliquam molestias quia sunt doloremque quis natus vero aliquid autem.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est commodi eum eos,
                    neque illum perspiciatis consequuntur incidunt laborum dignissimos ullam 
                    aliquam molestias quia sunt doloremque quis natus vero aliquid autem.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est commodi eum eos,
                    neque illum perspiciatis consequuntur incidunt laborum dignissimos ullam 
                    aliquam molestias quia sunt doloremque quis natus vero aliquid autem.
                  </p>

                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est commodi eum eos,
                    neque illum perspiciatis consequuntur incidunt laborum dignissimos ullam 
                    aliquam molestias quia sunt doloremque quis natus vero aliquid autem.
                  </p>
                </div>
                <h5 className='text-right'>-- SinaArtz.</h5>
            </Col>
        </Row>
        <Row className={`${styles.Services}`}>
          <Col className='p-0'>
            <h2 className='text-center'>Our Services</h2>
            <ServicesCarousel />
          </Col>
        </Row>
        <LatestOffers />
    </Container>
  )
}

export default About