import { Form } from 'react-bootstrap'
import styles from './ServicesBar.module.css'
import { useQuery } from 'react-query'
import sectionsBackend from '../../../../backend/sections.backend'

const ServicesBar = (props) => {

  const services = useQuery('services', sectionsBackend.getSections)

  const handleChange = (ev) => {
    const uhash = ev.target.value
    const service = services.data.find(value => value.uhash === uhash)
    if (service) {
      props.updateService(service)
    }
  }
    
  return (
    <Form.Select 
    className={`bg-dark text-light ${styles.Select}`} 
    value={props.serviceHash}
    onChange={handleChange}>
        <option>Select service</option>
        {
          services.isLoading ? <option>Loading</option> : ''
        }
        {
            services.isSuccess ? services.data.map((value) => (
                <option 
                  value={value.uhash} 
                  key={value.uhash}>
                  {value.title}
                </option>
            )) : ''
        }
    </Form.Select>
  )
}

export default ServicesBar