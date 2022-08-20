import { useReducer } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

import styles from './Contact.module.css'
import { Button } from 'react-bootstrap'

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const Contact = () => {
  const [form, updateForm] = useReducer(formReducer, {})
  const handleChange = event => {
    const data = {
      name: event.target.name,
      value: event.target.value
    }
    updateForm(data)
  }

  const handleSubmit = event => {
    event.preventDefault();
    alert(JSON.stringify(form))
  }
  return (
    <div className={styles.MainDiv}>
      <Container className={styles.SectionContainer}>
        <Row className={`justify-content-center align-items-center`}>
          <Col className='col-12 col-md-4'>
            <div className={styles.SectionContainerCol}>
              <h1>Contact Us</h1>
              <div>
                <h5>Reach out to us via <a href="tel:+2347057570146">call</a> or <a href='mailto:jerrycul2001@gmail.com'>mail</a></h5>
              </div>
            </div>
          </Col>
          <Col className={`${styles.ContactForm}`}>
            <Form onSubmit={handleSubmit}>
              <h2 className='text-light text-center m-2'>OR<span className='d-none d-md-inline'>... simply fill this form</span></h2>
              <Form.Group controlId="email" className={`${styles.FormGroup}`}>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder="Enter your email address" name='email' onChange={handleChange} value={form.email || ''} required={true}/>
                <Form.Text>We need your email just to reach you</Form.Text>
              </Form.Group>
              <Form.Group controlId="message" className={`${styles.FormGroup}`}>
                <Form.Label>What will you like to tell us?</Form.Label>
                <Form.Control as='textarea' min={50} placeholder="..." value={form.message || ''} name='message' onChange={handleChange} required={true}/>
              </Form.Group>
              <div className='d-flex justify-content-end'>
                <Button variant='primary' type='submit'>Send</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Contact