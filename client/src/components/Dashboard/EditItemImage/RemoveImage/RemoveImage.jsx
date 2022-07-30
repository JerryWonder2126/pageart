import { useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import offersBackend from "../../../../backend/offers.backend"
import ImageCard from "../ImageCard/ImageCard"
import AlertS from "../../../AlertS/AlertS"
import styles from "./RemoveImage.module.css"

const RemoveImage = (props) => {
  const {item, images} = props
  
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const client = useQueryClient()
  const refreshOffers = client.invalidateQueries(['offers', item.section_hash])
  const deleteMutation = useMutation(offersBackend.deleteOfferImage, {
    isSuccess: refreshOffers,
  })

  const deleteWrapper = (index) => {
    if (!deleteMutation.isLoading) {
        setActiveImageIndex(index)
        deleteImage(index)
    }
  }

  const deleteImage = (index) => {
    if (!deleteMutation.isLoading) {
      const url = images[index]
      const updateWith = []
      images.forEach(value => {
        if (value !== url) updateWith.push(value)
      })
      let data = {
        uhash: item.uhash,
        nameToDelete: url,
        updateWith
      }
      deleteMutation.mutate(data, {
        onSuccess: () => images.splice(index, 1)
      })
    }
  }

  return (
    <>
        
      <h4 className={styles.Heading}>Remove Image(s)</h4>
      {
        deleteMutation.error && <AlertS noTitle={true}/>
      }
      <div className={`${styles.PreviewImageDiv}`}>
        {images.length === 1 ? 
        <ImageCard imgURL={images[0]} single={true}/> : 
          images.map((url, index) => 
            <ImageCard 
            key={index} 
            imgURL={url}
            loading={!deleteMutation.isError && !deleteMutation.isIdle && index === activeImageIndex} 
            deleteCallBack={() => deleteWrapper(index)} />
          )}
      </div>
    </>
  )
}

export default RemoveImage