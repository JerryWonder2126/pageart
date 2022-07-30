import { Button } from 'react-bootstrap'
import { useUpdateDashboardContext } from '../../../contexts/DashboardContext'
import ItemCard from '../ItemCard/ItemCard'
import ServicesBar from './ServicesBar/ServicesBar'
import styles from './Offers.module.css'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useEffect, useState } from 'react'
import ArtSession from '../../../contexts/Session/AppSession'
import offersBackend from '../../../backend/offers.backend'
import Loader from '../../Loader/Loader'
import DeleteModal from '../DeleteModal/DeleteModal'

const Offers = () => {
  const {processOffer, processItemImage} = useUpdateDashboardContext()
  const [activeService, updateActiveService] = useState({})

  const [activeOffer, updateActiveOffer] = useState({})
  const [show, updateShow] = useState(false)

  const openDeleteModal = (item) => {
    deleteMutation.reset()
    updateShow(true)
    updateActiveOffer(item)
  }

  const hideDeleteModal = () => {
    updateShow(false)
    updateActiveOffer({})
  }

  useEffect(() => {
    let uhash = ArtSession.getService()
    activeService.uhash = uhash ? uhash : ''
  })

  const offers = useQuery(['offers', activeService?.uhash], offersBackend.getOffersBySection)
  const client = useQueryClient()
  const deleteMutation = useMutation(offersBackend.deleteOffer, {
    onSuccess: () => client.invalidateQueries(['offers', activeService?.uhash])
  })
  const deleteOffer = () => {
    deleteMutation.mutate(activeOffer.uhash)
    if (deleteMutation.isSuccess) hideDeleteModal()
  }

  const updateService = (service) => {
    ArtSession.updateService(service.uhash)
    updateActiveService(service)
  }

  const addOffer = () => processOffer('add')
  const editOfferView = (item) => processOffer('edit', item)
  const editOfferImageView = (item) => processItemImage('offer', item)
  const previewOfferView = (item, isOffer) => processOffer('preview', item, isOffer)

  const loadOffers = (offers) => {
    let display;
    if (offers.length) {
        display = offers.map(item => (
          <ItemCard key={item.uhash} item={item} type='offer' callbacks={[previewOfferView, editOfferView, editOfferImageView, openDeleteModal]} />
      ))
    } else {
        display = activeService.title ? <p>No offers for {activeService.title}</p> : <p>Select service</p>
    }
    return display
  }

  return (
    <>
      <ServicesBar updateService={updateService} serviceHash={activeService?.uhash} />
      { activeService.uhash ? <Button variant='secondary' onClick={addOffer} className={`${styles.AddButton}`}>+ offer</Button> : ''}
      { offers.isLoading ? <Loader display='block' clearHeight={true}/> : '' }
      { offers.isSuccess && loadOffers(offers.data) }

      <DeleteModal
        title={activeOffer.title}
        show={show}
        hide={hideDeleteModal}
        deleteCallBack={deleteOffer}
        mutation={deleteMutation}
      />
    </>
  )
}

export default Offers