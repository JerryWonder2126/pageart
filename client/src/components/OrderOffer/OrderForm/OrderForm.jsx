import { useReducer } from "react"
import { Button, Form } from "react-bootstrap"

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

const OrderForm = () => {
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
    <Form>
      <Form.Text className='text-dark'>
        Kindly fill this form to place your order with us.
        The information you provide are only used to contact you.
      </Form.Text>
      <Form.Group controlId="name" className='mb-3'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' placeholder="What's your name?" name="name" onChange={handleChange} value={form.name || ''}/>
      </Form.Group>
      <Form.Group controlId="email" className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder="Enter your email address" name='email' onChange={handleChange} value={form.email || ''}/>
      </Form.Group>
      <Form.Group controlId="message" className='mb-3'>
        <Form.Label>Any other thing you'll like to tell us?</Form.Label>
        <Form.Control as='textarea' placeholder="..." value={form.message || ''} name='message' onChange={handleChange}/>
      </Form.Group>
      <div className="d-flex justify-content-end mb-3">
        <Button onClick={handleSubmit} variant='dark' type='submit'>Submit</Button>
      </div>
    </Form>
  )
}

export default OrderForm