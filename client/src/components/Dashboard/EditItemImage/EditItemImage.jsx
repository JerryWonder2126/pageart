import styles from './EditItemImage.module.css'
import RemoveImage from './RemoveImage/RemoveImage'
import AddImage from './AddImage/AddImage'

const EditItemImage = (props) => {
  const isOffer = props.type === 'offer'
  const images = isOffer ? props.item.imgurl : [props.item.imgurl]
  

  return (
    <div className={styles.MainDiv}>
      <AddImage item={props.item} isOffer={isOffer}/>
      <RemoveImage images={images} item={props.item}/>
    </div>
  )
}

export default EditItemImage