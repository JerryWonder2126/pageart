import styles from "./OrderDescription.module.css"

const OrderDescription = (props) => {
  const offer = props.offer

  const displayTags = () => {
    const tags = [offer.dimension, offer.orientation, offer.medium, offer.status]
    return tags.map((tag, index) => tag ? <span key={index}>{tag}</span> : '')
  }
  return (
    <div className="text-center">
      <p>
        {offer.long_description}&nbsp; 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis, vel culpa? 
        Minus doloremque veniam facilis eveniet perspiciatis aut vero! Omnis velit ea 
        temporibus magni eius aliquam minima, recusandae qui numquam.
      </p>
      <h6>-- {offer.artist || 'Artist Ikeji'}</h6>
      <div className={styles.OrderTags}>{ displayTags() }</div>
    </div>
  )
}

export default OrderDescription