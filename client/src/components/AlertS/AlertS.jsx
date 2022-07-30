import { useState } from 'react'
import { Alert } from 'react-bootstrap'

const AlertS = (props) => {
  const {noTitle} = props
  const dismissible = props.dismissible || true
  const variant = props.variant || 'danger'
  const message = props.message ? props.message : <span>An error occured, please try again or refresh page</span>
  const [show, setShow] = useState(true)
  return (
    <>
      {show && 
      <Alert onClose={() => setShow(false)} variant={variant} dismissible={dismissible}>
        {noTitle || <Alert.Heading>Oh snap! You got an error!</Alert.Heading>}
        {message}
      </Alert>}
    </>
  )
}

export default AlertS