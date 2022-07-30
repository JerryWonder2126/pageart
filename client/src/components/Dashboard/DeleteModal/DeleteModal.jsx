import { Button, Modal } from "react-bootstrap"

const DeleteModal = (props) => {
  const {title, show, hide, mutation, deleteCallBack} = props

//   const handleClose = () => updateShow(!show)

  return (
    <Modal show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{mutation.isError ? 'Error' : 'Action Confirmation'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
            mutation.isError ? 
            <p className='danger'>Oops! An error occured, please try again</p>
                : 
            <p>
                Are you sure you want to delete {title}? <br/><br/>
                <strong className="text-danger"><i>NOTE: This action is irreversible</i></strong>
            </p>
        }
      </Modal.Body>
      {mutation.isError || <Modal.Footer>
        <Button variant='secondary' onClick={hide}>close</Button>
        <Button variant='danger' onClick={deleteCallBack}>
            {mutation.isLoading ? 'deleting...' : 'delete'}
        </Button>
      </Modal.Footer>}
    </Modal>
  )
}

export default DeleteModal