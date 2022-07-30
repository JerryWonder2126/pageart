import { Row, Card, Carousel } from 'react-bootstrap';
import instagramIcon from '../../../assets/icons/instagram.png'
import styles from './Reviews.module.css'

const Reviews = () => {
    const reviews = [
        {
          id: 0,
          name: 'Josephine Aderiope',
          imgurl: instagramIcon,
          review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque, neque tempore amet molestias soluta harum nemo sunt! Cum iure doloribus debitis at sapilanditiis non qui at consequuntur ab modi veritatis saepe dignissimos reprehenderit incidunt exercitationem dolorum. Quos voluptate quam vel, eos atque quia minima! Vel!`    },
        {
          id: 1,
          name: 'Eniola Omotoyeni',
          imgurl: instagramIcon,
          review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque, neque tempore amet molestias soluta harum nemo sunt! Cum iure doloribus debitis at sapilanditiis non qui at consequuntur ab modi veritatis saepe dignissimos reprehenderit incidunt exercitationem dolorum. Quos voluptate quam vel, eos atque quia minima! Vel!`
        },
        {
          id: 2,
          name: 'Emmanuel Aderiope',
          imgurl: instagramIcon,
          review: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum eaque, neque tempore amet molestias soluta harum nemo sunt! Cum iure doloribus debitis at sapilanditiis non qui at consequuntur ab modi veritatis saepe dignissimos reprehenderit incidunt exercitationem dolorum. Quos voluptate quam vel, eos atque quia minima! Vel!`
        }
      ]
  return (
    <Row className={styles.MainDiv}>
        <h2 className=''>What our clients say about us.</h2>
        
        <Carousel variant='dark' controls={false}>
          {
            reviews.map(({id, name, imgurl, review}) => (
              
                <Carousel.Item key={id}>
                  <Card className={styles.ReviewCard}>
                    <Card.Body>
                      <Card.Text>"{review}"</Card.Text>
                      <Card.Img src={imgurl} />
                      <Card.Subtitle as='h6' className='mx-2 d-inline'>{name}</Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Carousel.Item>
            ))
          }
        </Carousel>
      </Row>
  )
}

export default Reviews