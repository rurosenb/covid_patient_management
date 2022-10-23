import React from 'react'
import { NavLink,} from 'react-bootstrap';
import NavBar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import  NavDropdown  from 'react-bootstrap/NavDropdown';



const AppNavBar = () => {
  return (
    <>
   <NavBar bg="dark" variant="dark" expand="lg">
    <Container>
        <NavBar.Brand >Covid Patient Manager</NavBar.Brand>
        {/* <NavBar.Toggle aria-controls='basic-navbar-nav'/> */}
        <NavBar.Collapse id='basic-navbar-nav'>
        <Nav className="me-auto">
        <Nav.Link>
        <Link to="/">Home Page</Link>
        </Nav.Link>
        <Nav.Link>
          <Link to="/createpatient">Create Patient</Link>
          </Nav.Link>
          <Nav.Link>
          <Link to="/patientlist">Patient List</Link>
        </Nav.Link>
        </Nav>
        </NavBar.Collapse>
    </Container>
    
</NavBar>
</>
  )
}

export default AppNavBar