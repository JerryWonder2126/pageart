import { useQueryClient, useMutation } from "react-query"
import sectionsBackend from "../../../../backend/sections.backend"
import offersBackend from "../../../../backend/offers.backend"
import { Form, Button } from "react-bootstrap"
import AlertS from "../../../AlertS/AlertS"
import styles from './AddImage.module.css'

const AddImage = (props) => {
  const {item, isOffer} = props
    const client = useQueryClient()

  const refreshOffers = client.invalidateQueries(['offers', item.section_hash])
  const refreshSections = client.invalidateQueries('sections')
    const updateMutation = useMutation(isOffer ? offersBackend.updateOfferImages : sectionsBackend.updateSectionImage, {
        isSuccess: isOffer ? refreshOffers : refreshSections
      })

    const handleSubmit = ev => {
        ev.preventDefault()
        if (ev.target.reportValidity()) {
          const images = ev.target.imgurl.files
          const data = {
            uhash: item.uhash,
            previousImageUrls: item.imgurl,
            images: {...images, type: 'image'}
          }
          updateMutation.mutate(data)
        }
      }
  return (
    <>
        <h4 className={styles.Heading}>Add Image(s)</h4>
      <div className={`${styles.AddImageDiv}`}>
        <Form onSubmit={handleSubmit}>
          {
            updateMutation.error && <AlertS noTitle={true}/>
          }
          <Form.Group controlId='images' className='mb-3'>
            <Form.Label>Images</Form.Label>
            <Form.Control 
              type='file' 
              name='imgurl' 
              formEncType='image/*' 
              placeholder='Select offer images' 
              multiple={isOffer ? true : false} 
              required={true} 
              disabled={updateMutation.isLoading ? true : false}
            />
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='dark' type='submit' disabled={updateMutation.isLoading ? true : false}>
              {updateMutation.isLoading ? 'Adding Image...' : 'Add Image'}
            </Button>
          </div>
        </Form>
      </div>
    </>
  )
}

export default AddImage