import { Row, Col } from 'react-bootstrap'
import styles from './WhatWeDo.module.css'
import checkedIcon from '../../../assets/icons/checked.png'

const WhatWeDo = () => {
    const whatWeDo = [
        {
          title: 'Abstract painting',
          text: 'We do abstract painting'
        },
        {
          title: 'Body and Face painting',
          text: 'We do colourful body and face painting'
        },
        {
          title: 'Craft and Art works',
          text: 'we build crafts and develop art works'
        },
        {
          title: 'Interior decor',
          text: 'we do interior decoration and paint walls'
        },
        {
          title: 'Miscellaneous',
          text: 'we do even more than this. Simply go to our contact page to reach out to us on your specific need.'
        }
    ]
  return (
    <Row className='justify-content-center my-5'>
        <Col xs={12} lg={10} className={`${styles.WeDoDiv}`}>
            <h2 className='text-center mb-3'>What we do.</h2>
            <ul>
            {
                whatWeDo.map(({title, text}, index) => (
                    <li key={index}>
                    <img src={checkedIcon} alt="checked" />
                    <div>
                        <h6>{title}</h6>
                        <p>{text}</p>
                    </div>
                    </li>
                ))
            }
            </ul>
        </Col>
    </Row>
  )
}

export default WhatWeDo