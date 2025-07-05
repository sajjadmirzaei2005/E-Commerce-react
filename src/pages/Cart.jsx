import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Container, Row, Col, Card, Button, Image, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';


export default function Cart() {

  const { cartItems, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
  return cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
};



  return (
    <Container style={{ marginTop: '80px' }}>

      <h2 className="mb-4">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id} className="mb-3 border rounded">
                  <Row className="align-items-center">
                    <Col md={2}>
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: '100px', overflow: 'hidden' }}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="img-fluid"
                          style={{ maxHeight: '100px', objectFit: 'contain' }}
                        />
                      </div>
                    </Col>
                    <Col md={4}>
                      <h6 className="mb-1">{item.title}</h6>
                      <small className="text-muted">${item.price.toFixed(2)} each</small>
                    </Col>
                    <Col md={2}>
                      <strong>x {item.quantity}</strong>
                    </Col>
                    <Col md={2}>
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </Col>
                    <Col md={2}>
                      <Button onClick={() => removeFromCart(item)} variant="outline-danger" size="sm">
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card className="p-3">

              <h5>Order Summary</h5>
              <hr />
              <p>Total Items: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</p>
              <p className="fw-bold fs-5">Total: ${calculateTotal()}</p>

              <Button
                variant="success"
                className="w-100 mb-2"
                onClick={() => {
                  if (user) {
                    navigate('/checkout');
                  } else {
                    alert("please first Login / Signup")
                    navigate('/login');
                  }
                }}
              >
              Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline-primary" className="w-100">
                  Continue Shopping
                </Button>
              </Link>

            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
