import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap"
import styles from "./ItemCard.module.css"


const ItemCard = (props) => {
  const imgurl = props.type === 'offer' ? props.item.imgurl[0] : props.item.imgurl
  const isOffer = props.type === 'offer'
  const [previewTextView, editTextView, editImageView, openDeleteModal] = props.callbacks
  return (
    <Card className={`${styles.ItemCard} mb-3`}>
        <Card.Body>
            <div style={{backgroundImage: `url(${imgurl})`}}></div>
            <div>
              <Card.Title as='h6'>{props.item.title}</Card.Title>
              <Button variant='secondary' onClick={() => previewTextView(props.item, isOffer)}>preview</Button>
              {/* <Button onClick={() => editTextView(props.item)}>edit</Button> */}
              <Dropdown as={ButtonGroup}>
                <Button onClick={() => editTextView(props.item)}>edit</Button>
                <Dropdown.Toggle split id='edit-dropdown-toggle'/>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => editTextView(props.item)}>Edit (default)</Dropdown.Item>
                  <Dropdown.Item onClick={() => editImageView(props.item)}>Edit Image</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button variant='danger' onClick={() => openDeleteModal(props.item)}>delete</Button>
            </div>
        </Card.Body>
    </Card>
  )
}

export default ItemCard