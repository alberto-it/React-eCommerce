import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  return ( <>
    <Navbar bg="primary" expand="sm">
      <Navbar.Brand href="/home">&nbsp;&nbsp;&nbsp;E-commerce</Navbar.Brand>
      <Navbar.Collapse>
        <Nav>
          <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/customers">Customers</Nav.Link>
          <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
          <Nav.Link as={NavLink} to="/orders">Orders</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    <div style={{ marginTop: '25px' }}></div>
    </>
  );
};

export default NavBar;
