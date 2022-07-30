import { useReducer, useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useQueryClient, useMutation } from 'react-query'
import { useUpdateDashboardContext } from '../../../../contexts/DashboardContext'
import styles from './OfferForm.module.css'
import ArtSession from '../../../../contexts/Session/AppSession'
import offersBackend from '../../../../backend/offers.backend'
import AlertS from '../../../AlertS/AlertS'

const formReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value
  }
}

const OfferForm = (props) => {
  const isEditMode = props.type === 'edit'
  const initialOffer = isEditMode ? props.offer : {
    title: '',
    short_description: '',
    long_description: '',
    imgurl: '',
    price: 10000,
    section_hash: '',
    artist: '',
    year: 2022,
    dimension: '',
    orientation: '',
    medium: '',
    status: 'on sale'
  }
  const [form, updateForm] = useReducer(formReducer, initialOffer)
  const {previousView} = useUpdateDashboardContext()

  useEffect(() => {
    let uhash = ArtSession.getService()
    form.section_hash = uhash ? uhash : ''
  })

  const client = useQueryClient()
  const refreshOffers = () => {
    client.invalidateQueries(['offers', form?.uhash])
    previousView()
  }
  const mutation = useMutation(isEditMode ? offersBackend.updateOfferText : offersBackend.addOffer, {
    onSuccess: refreshOffers
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
  const handleSubmit = ev => {
    ev.preventDefault()
    let data
    if (ev.target.reportValidity()) {
      if (!isEditMode) {
        const images = ev.target.imgurl.files
        data = {...form, images: {...images, type: 'image'}}
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
    <Form onSubmit={handleSubmit} className={`${styles.Form} row g-1`}>
      <h5>{isEditMode ? 'Edit' : 'Add'} Offer</h5>
      {
        mutation.error && <AlertS noTitle={true}/>
      }
      <Form.Group controlId='title' className='col-12 mb-3'>
        <Form.Label>title</Form.Label>
        <Form.Control type='text' name='title' placeholder='Enter offer title' onChange={handleChange} value={form.title} required={true} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group controlId='short_description' className='col-12 mb-3'>
        <Form.Label>short description</Form.Label>
        <Form.Control type='text' name='short_description' placeholder='Enter short description for offer' onChange={handleChange} value={form.short_description} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group controlId='long_description' className='col-12 mb-3'>
        <Form.Label>long description</Form.Label>
        <Form.Control as='textarea' name='long_description' placeholder='Enter long description for offer' onChange={handleChange} value={form.long_description} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group  controlId='price' className='col-6 mb-3'>
        <Form.Label>Price</Form.Label>
        <Form.Control type='number' step={0.01} name='price' placeholder='Enter price for offer' onChange={handleChange} value={form.price} required={true} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group controlId='artist' className='col-6 mb-3'>
        <Form.Label>Artist</Form.Label>
        <Form.Control type='text' name='artist' placeholder='Artist here' onChange={handleChange} value={form.artist} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group controlId='dimension' className='col-4 mb-3'>
        <Form.Label>Dimension</Form.Label>
        <Form.Control type='text' name='dimension' placeholder='Dimension here' onChange={handleChange} value={form.dimension} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      <Form.Group controlId='medium' className='col-4 mb-3'>
        <Form.Label>Medium</Form.Label>
        <Form.Control type='text' name='medium' placeholder='Medium goes here' onChange={handleChange} value={form.medium} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      {/* <Form.Group controlId='orientation' className='col-4 mb-3'>
        <Form.Label>Orientation</Form.Label>
        <Form.Control type='text' name='orientation' placeholder='Enter orientation here' onChange={handleChange} value={form.orientation} disabled={mutation.isLoading ? true : false}/>
      </Form.Group> */}
      <Form.Group controlId='orientation' className='col-4 mb-3'>
        <Form.Label>Orientation</Form.Label>
        <Form.Select name='orientation' onChange={handleChange} value={form.orientation} required={true} disabled={mutation.isLoading ? true : false}>
          <option value=''>--select orientation--</option>
          <option value='portrait'>portrait</option>
          <option value='landscape'>landscape</option>
          <option value='portrait & landscape'>both</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId='status' className='col-8 mb-3'>
        <Form.Label>Status</Form.Label>
        <Form.Select name='status' onChange={handleChange} value={form.status} required={true} disabled={mutation.isLoading ? true : false}>
          <option value=''>--select status--</option>
          <option value='sold'>sold</option>
          <option value='on sale'>on sale</option>
        </Form.Select>
      </Form.Group>
      <Form.Group controlId='year' className='col-4 mb-3'>
        <Form.Label>Year</Form.Label>
        <Form.Control type='number' name='year' placeholder={new Date().getFullYear()} onChange={handleChange} value={form.year} required={true} disabled={mutation.isLoading ? true : false}/>
      </Form.Group>
      {
        !isEditMode ? <Form.Group controlId='images' className='col-12 mb-3'>
          <Form.Label>Images</Form.Label>
          <Form.Control type='file' name='imgurl' formEncType='image/*' placeholder='Select offer images' multiple onChange={handleChange} value={form.imgurl} required={true} disabled={mutation.isLoading ? true : false}/>
        </Form.Group> : ''
      }
      <div className='d-flex justify-content-end'>
        <Button variant='danger' className='mx-2' onClick={cancelRequest}>cancel</Button>
        <Button variant='dark' type='submit'  disabled={mutation.isLoading ? true : false}>
          {
            mutation.isLoading ? (isEditMode ? 'Updating Offer...' : 'Adding Offer...' ) : (isEditMode ? 'Update Offer' : 'Add Offer' )
          }
        </Button>
      </div>
    </Form>
  )
}

export default OfferForm