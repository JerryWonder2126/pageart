import { useQuery } from "react-query"
import { useUpdateMainContext } from '../../contexts/MainContext';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';
import { useState } from 'react';
import styles from './Nav.module.css'
import sectionsBackend from "../../backend/sections.backend";

const NavComponent = () => {

  const {changeView, openOffersView} = useUpdateMainContext();
  const [expanded, setExpanded] = useState(false)

  const services = useQuery('services', sectionsBackend.getSections)

  const setView = (callback, ...args) => {
    setExpanded(false)
    callback(...args)
  }

  return (
    <Navbar bg="dark" expand="sm" variant="dark" expanded={expanded}>
      <Container className="py-3" fluid>
        <Navbar.Brand href="#" className={styles.NavBarBrand}>ArtExhibit</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : 'expanded')} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.NavBar}>
            <Nav.Item onClick={() => setView(changeView, 'home')}>
              <Nav.Link>Home</Nav.Link>
            </Nav.Item>
            <NavDropdown title="Services" className={styles.DropDown}>
              {services.isLoading ? 'Loading' : ''}
              {services.isSuccess ? 
                services.data.map(({title, uhash}) => <NavDropdown.Item key={uhash} onClick={() => setView(openOffersView, title, uhash)}>{title}</NavDropdown.Item>)
                : ''
              }
            </NavDropdown>
            <Nav.Item onClick={() => setView(changeView, 'about')}>
              <Nav.Link>About</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => setView(changeView, 'contact')}>
              <Nav.Link>Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavComponent