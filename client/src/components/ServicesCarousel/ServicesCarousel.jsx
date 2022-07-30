import { Button, Carousel } from "react-bootstrap"
import { useQuery } from "react-query"
import styles from './ServicesCarousel.module.css'
import { useUpdateMainContext } from '../../contexts/MainContext';
import sectionsBackend from "../../backend/sections.backend";
import Loader from "../Loader/Loader";
import AlertS from "../AlertS/AlertS";

const ServicesCarousel = () => {

  const services = useQuery('services', sectionsBackend.getSections)
  
  const {openOffersView} = useUpdateMainContext();


  return (
    <>
      {services.isLoading ? <Loader display='block' /> : ''}
      {services.isError && <AlertS/>}
      {services.isSuccess ? 
      <Carousel interval={10000} className='bg-dark' controls={false} fade>
        {
          services.data.map(({id, title, imgurl, uhash}) => 
              (
              <Carousel.Item className={styles.ServiceItem} style={{backgroundImage: `url(${imgurl})`}} key={id}>
                <div>
                  <h3 className="text-light text-capitalize text-center">{title}</h3>
                  <Button onClick={() => openOffersView(title, uhash)} variant='primary'>view category</Button>
                </div>
              </Carousel.Item>
              )
          )
        }
      </Carousel>
       : ''}
      
    </>
  )
}

export default ServicesCarousel