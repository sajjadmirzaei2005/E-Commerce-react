// src/components/WelcomeModal.js
import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function WelcomeModal() {


  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');


  useEffect(() => {

    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const handleSubscribe = () => {

    console.log('Email submitted:', email);
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>

      <Modal.Header closeButton>
        <Modal.Title>Welcome to Our Store 🎉</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Subscribe to our newsletter and get <strong>20% OFF</strong> your first order!</p>
        <Form>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

        </Form>

        <p className="text-muted" style={{ fontSize: '0.85rem' }}>
          By subscribing, you agree to receive promotional emails. You can unsubscribe anytime.
        </p>

      </Modal.Body>

      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Maybe Later
        </Button>
        <Button variant="primary" onClick={handleSubscribe} disabled={!email}>
          Send discount to email
        </Button>

      </Modal.Footer>

    </Modal>
  );
}