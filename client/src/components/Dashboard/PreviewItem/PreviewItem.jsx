import { Accordion, Carousel } from "react-bootstrap"
import styles from "./PreviewItem.module.css"

const PreviewItem = (props) => {
  const {item, isOffer} = props
  const imgurl = isOffer ? item.imgurl : [item.imgurl]
  const mainInfo = ['short_description', 'long_description']
  const otherInfo = ['price', 'artist', 'medium', 'orientation', 'dimension', 'status', 'year']
  const displayMainInfo = mainInfo.map((info, index) => 
    <Accordion.Item className={styles.AccordionItem} key={index} eventKey={index} style={{backgroundColor: !item[info] ? 'rgb(255 193 7 / 71%)' : 'var(--bs-gray-300)'}}>
      <Accordion.Header>{ info.replace('_', ' ') }</Accordion.Header>
      <Accordion.Body>{ item[info] ? item[info] : 'Not specified' }</Accordion.Body>
    </Accordion.Item>
  )
  const displayOtherInfo = 
  <Accordion.Item eventkey={2} className={styles.AccordionItem}>
    <Accordion.Header>Others</Accordion.Header>
    <Accordion.Body>
      { 
        otherInfo.map((info, index) =>  
        <div className={styles.Others} key={index} style={{backgroundColor: !item[info] ? 'rgb(255 193 7 / 71%)' : 'var(--bs-gray-300)'}}>
          <h5>{info}</h5>
          <p>{item[info] ? item[info] : 'Not specified'}</p>
        </div>)
      }
    </Accordion.Body>
  </Accordion.Item>

  return (
    <div className={`mb-5`}>
      <h1 className='bg-dark text-light p-2 mt-2 mt-md-0'>Preview for {item.title}</h1>
      <Carousel controls={false} className='bg-dark' fade>
        {
          imgurl.map((url, index) => 
            (
              <Carousel.Item className={styles.ItemImage} style={{backgroundImage: `url(${url})`}} key={index}></Carousel.Item>
            )
          )
        }
      </Carousel>
      { isOffer && 
        <Accordion>
          { displayMainInfo }
          { displayOtherInfo }
        </Accordion> 
      }
    </div>
  )
}

export default PreviewItem