import { Button } from 'react-bootstrap'
import closeIcon from '../../../../assets/icons/close.png'
import styles from './ImageCard.module.css'
import Loader from '../../../Loader/Loader'

const ImageCard = (props) => {
  const {imgURL, deleteCallBack, single, loading} = props

  const deleteIconClick = () => {
    deleteCallBack()
  }

  const loader = loading && <Loader backdrop={true} borderRadius='20px' noFlex={true} />

  return (
    <div className={styles.ImageCard} style={{backgroundImage: `url(${imgURL})`}}>
      {loader}
      {!single && <Button onClick={deleteIconClick} variant='dark'><img src={closeIcon} alt='close button'/></Button>}
    </div>
  )
}

export default ImageCard