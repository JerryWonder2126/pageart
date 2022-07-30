import { useReducer, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useMutation, useQueryClient } from 'react-query'
import sectionsBackend from '../../../../backend/sections.backend'
import { useUpdateDashboardContext } from '../../../../contexts/DashboardContext'
import AlertS from '../../../AlertS/AlertS'
import styles from './ServiceForm.module.css'

const formReducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value
    }
}

const ServiceForm = (props) => {
  const isEditMode = props.type === 'edit'
  const {previousView} = useUpdateDashboardContext()
  const initialService = isEditMode ? props.service : {
    title: '',
    imgurl: ''
  }
  const [form, updateForm] = useReducer(formReducer, initialService)
  const div = useRef()

  const client = useQueryClient()

  const refreshServices = () => {
    client.invalidateQueries('services')
    previousView()
  }

  const mutation = useMutation(isEditMode ? sectionsBackend.updateSectionTitle : sectionsBackend.addSection, {
    onSuccess: refreshServices
  })

  const handleChange = ev => {
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

    if (typeof(action.value) === 'string') {
      action.value = action.value.trim() ? action.value : action.value.trim()
    }

    updateForm(action)
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    let data
    if (ev.target.reportValidity()) {
      if (!isEditMode) {
        const imgurl = ev.target.imgurl.files
        data = {...form, images: {...imgurl, type: 'image'}}
      } else {
        data = form
      }
      mutation.mutate(data)
    }
  }

  const cancelRequest = () => {
    mutation.reset()
    previousView()
  }
  
  return (
    <Form onSubmit={handleSubmit} className={styles.Form}>
      <h5>{isEditMode ? 'Edit' : 'Add'} Section</h5>
      {
        mutation.error && <AlertS noTitle={true}/>
      }
      <Form.Group controlId='title' className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control type='text' ref={div} placeholder='service title goes here' name='title' required={true} onChange={handleChange} value={form.title} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      {
        !isEditMode ? <Form.Group controlId='image' className='mb-3'>
          <Form.Label>Image</Form.Label>
          <Form.Control type='file' ref={div} formEncType='image/*' required={true} onChange={handleChange} value={form.imgurl} name='imgurl' disabled={mutation.isLoading ? true : false}/>
      </Form.Group> : ''
      }
      <div className='d-flex justify-content-end'>
        <Button variant='danger' className='mx-2' onClick={cancelRequest}>cancel</Button>
        <Button variant='dark' type='submit' disabled={mutation.isLoading ? true : false}>
          {
            mutation.isLoading ? (isEditMode ? 'Updating Section...' : 'Adding Section...' ) : (isEditMode ? 'Update Section' : 'Add Section' )
          }
        </Button>
      </div>
    </Form>
  )
}

export default ServiceForm