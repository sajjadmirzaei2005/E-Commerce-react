import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Footer() {

  return (

    <footer className="bg-body-tertiary text-dark">

      <Container>
        <Row className="py-4">

          <Col xs={12} md={4}>
            <h5>About Us</h5>
            <p>We are an e-commerce website that offers the best products.</p>
          </Col>

          <Col xs={12} md={4}>
            <h5>Important Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </Col>

          <Col xs={12} md={4}>
            <h5>Contact Us</h5>
            <p>Gmail: sajjadmirzaei2005@gmail.com</p>
            <p>Phone: 09352557002</p>
          </Col>
        </Row>

        <Row>
          <Col className="text-center py-3">
            <p>&copy; {new Date().getFullYear()} E Commers All rights reserved</p>
          </Col>
        </Row>

      </Container>

    </footer>
  );
};