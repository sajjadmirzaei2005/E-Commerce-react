import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Bag } from 'react-bootstrap-icons';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function NavbarShop() {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Logout was successfull")
    navigate('/');
  };

  return (
    <Navbar fixed='top' expand="lg" className="bg-dark navbar-dark">

      <Container fluid>

        <Navbar.Brand as={Link} to="/">ECommerce</Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">

          <Nav className="me-auto my-2 my-lg-0" navbarScroll>

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>

          </Nav>

          <Nav >

            {user ? (
              <Nav.Link onClick={handleLogout} as={Link} to="/">Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Login / Signup</Nav.Link>
            )}

          </Nav>

          <Link to="/cart">

            <Button variant="outline-warning">
              <Bag />
            </Button>

          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}