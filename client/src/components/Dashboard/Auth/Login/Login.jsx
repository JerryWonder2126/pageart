import { useReducer, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import styles from './Login.module.css'
import authBackend from '../../../../backend/auth.backend'
import AlertS from '../../../AlertS/AlertS'

const formReducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value
    }
}

const Login = () => {
  const [form, updateForm] = useReducer(formReducer, {})
  const [errorMessageFromServer, updateErrorMessageFromServer] = useState('')

  const client = useQueryClient()
  const authMutation = useMutation(authBackend.login, {
    retry: false,
    onSuccess: () => client.invalidateQueries('authState'),
    onError: (error) => {
        updateErrorMessageFromServer(error.response.data)
        updateForm({name: 'password', value: ''})
    }
  })
  const handleSubmit = ev => {
    ev.preventDefault()
    if (ev.target.reportValidity()) {
        authMutation.mutate(form)
    }
  }
  const checkValues = ev => {
    if (!ev.target.reportValidity()) {
        ev.target.classList.add('border-danger')
        ev.target.classList.add('text-danger')
    } else {
        ev.target.classList.remove('text-danger')
        ev.target.classList.remove('border-danger')
    }
    const action = {
        name: ev.target.name, 
        value: ev.target.value
    }
    updateForm(action)
  }
  return (
    <Container>
        <Row className={styles.MainDiv}>
            <Col className='d-flex justify-content-center align-items-center'>
                <Form onSubmit={handleSubmit} className={styles.Form}>
                    <h1 className='text-center'>Authentication Checkpoint</h1>
                    {
                        authMutation.error && <AlertS message={errorMessageFromServer} noTitle={true} />
                    }
                    <Form.Group controlId='email' className='mb-3'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control 
                        type='email' 
                        name='email' 
                        placeholder='Enter your email here' 
                        value={form?.email || ''} 
                        onChange={checkValues} 
                        required={true}
                        disabled={authMutation.isLoading ? true : false}
                    />
                    </Form.Group>
                    <Form.Group  controlId='password' className='mb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                        type='password' 
                        name='password' 
                        placeholder='Enter your password here' 
                        value={form?.password || ''} 
                        onChange= {checkValues}
                        required={true}
                        disabled={authMutation.isLoading ? true : false}
                    />
                    </Form.Group>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className='m-0 p-0'>Forgot password? <a href='#reset'>reset it</a></p>
                        <Button variant='secondary' type='submit' disabled={authMutation.isLoading ? true : false}>
                            {authMutation.isLoading ? 'Logging in...' : 'Login'} 
                        </Button>
                    </div>
                    <div className='text-center mt-3'>
                        Copyright&copy; {new Date().getFullYear()} SinaArtz.com
                    </div>
                </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default Login