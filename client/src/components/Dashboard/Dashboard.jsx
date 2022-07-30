
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useDashboardContext, useUpdateDashboardContext } from '../../contexts/DashboardContext'
import { useMutation, useQueryClient } from 'react-query'
import { useEffect } from 'react'
import Auth from './Auth/Auth'
import styles from './Dashboard.module.css'
import authBackend from '../../backend/auth.backend'
import Loader from '../Loader/Loader'

const Dashboard = () => {

  const {view} = useDashboardContext()
  const {updateView, previousView} = useUpdateDashboardContext()

  useEffect(() => {
    window.scrollTo(0,0)
  }, [view])

  const client = useQueryClient()
  const authMutation = useMutation(authBackend.logout, {
    retry: false,
    onSuccess: () => client.invalidateQueries('authState')
  })

  const handleSignOut = () => {
    authMutation.mutate()
  }

  return (
    <Auth>
      <Container fluid className={styles.MainDiv}>
        <Row className='pt-3 g-2'>
          <Col xs={12} md={4} className={styles.FirstCol}>
            <div className={styles.AdminNav}>
              <Button variant='dark' onClick={() => updateView('admin:services')}>Services</Button>
              <Button variant='dark' onClick={() => updateView('admin:offers')}>Offers</Button>
              <Button variant='warning' onClick={previousView}>Back</Button>
              <Button variant='danger' onClick={handleSignOut}>
                { authMutation.isLoading ? <Loader /> : 'Sign Out' }
              </Button>
            </div>
          </Col>
          <Col className={styles.SecondCol}>
            {view}
          </Col>
        </Row>
      </Container>
    </Auth>
  )
}

export default Dashboard