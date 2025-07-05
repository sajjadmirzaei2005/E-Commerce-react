import { useContext, useRef } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, Row, Col, Card, Form, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { cartItems, clearCart, getTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    const form = formRef.current;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    clearCart();
    alert('✅ Your order was successfully placed!');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <Container style={{ marginTop: '100px', marginBottom: '50px' }}>
      <h2 className="mb-4 text-center">Order completion</h2>
      <Row>
        <Col md={7}>
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h5 className="mb-3">Customer Information</h5>
              <Form ref={formRef}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="e.g. Sajjad" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="e.g. Mirzaei" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="you@example.com" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" placeholder="0912xxxxxxx" required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Address</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="Your postal address..." required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" required />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={5}>
          <Card className="shadow-sm">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">Summary order</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <span>{item.title} x {item.quantity}</span>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Shipping cost</span>
                  <strong>$10.00</strong>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <strong>${(getTotal() + 10).toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>

              <Button
                variant="success"
                className="mt-4 w-100"
                size="lg"
                onClick={handleSubmitOrder}
              >
                Send order
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

