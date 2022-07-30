import { Button } from 'react-bootstrap'
import { useUpdateDashboardContext } from '../../../contexts/DashboardContext'
import ItemCard from '../ItemCard/ItemCard'
import styles from './Services.module.css'
import { useQuery, useMutation, useQueryClient } from 'react-query' 
import sectionsBackend from '../../../backend/sections.backend'
import {CSSTransition} from 'react-transition-group'
import Loader from '../../Loader/Loader'
import DeleteModal from '../DeleteModal/DeleteModal'
import { useState } from 'react'

const Services = () => {
  // const {services} = useDashboardContext()
  const {processService, processItemImage} = useUpdateDashboardContext()
  const services = useQuery('services', sectionsBackend.getSections)
  const [activeService, updateActiveService] = useState({})
  const [show, updateShow] = useState(false)

  const client = useQueryClient()
  const deleteMutation = useMutation(sectionsBackend.deleteSection, {
    onSuccess: () => client.invalidateQueries('services')
  })

  const deleteSection = () => {
    deleteMutation.mutate(activeService.uhash)
    if (deleteMutation.isSuccess) hideDeleteModal()
  }

  const addServiceView = () => processService('add')
  const editServiceView = (item) => processService('edit', item)
  const editServiceImageView = (item) => processItemImage('service', item)
  const previewServiceView = (item) => processService('preview', item)

  const openDeleteModal = (item) => {
    deleteMutation.reset()
    updateShow(true)
    updateActiveService(item)
  }

  const hideDeleteModal = () => {
    updateShow(false)
    updateActiveService({})
  }
  
  return (
    <>
      <Button variant='secondary' onClick={addServiceView} className={`${styles.AddButton}`}>+ services</Button>
      {
        services.isLoading ? <Loader display='block' clearHeight={true}/> : ''
      }
      {
        services.isError ? 'error' : ''
      }
      {
        services.isSuccess ? services.data.map(item => (
          <CSSTransition key={item.uhash} transition timeout={2000}>
            <ItemCard item={item} type='service' callbacks={[previewServiceView, editServiceView, editServiceImageView, openDeleteModal]} />
          </CSSTransition>
        )) : ''
      }

      <DeleteModal
        title={activeService.title}
        show={show}
        hide={hideDeleteModal}
        deleteCallBack={deleteSection}
        mutation={deleteMutation}
      />
    </>
  )
}

export default Services