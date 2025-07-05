import { useContext, useState } from 'react';
import { AuthContext } from './../context/AuthContext';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';


export default function Signup() {

  const { register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {

    e.preventDefault();

    const success = register(email, password);

    if (success) {
      navigate('/')

    } else {
      setError('This email is already exist!');
    }
  };

  return (

    <Container style={{ marginTop: "100px" }}>

      <Row className="justify-content-md-center mt-5">

        <Col md={6}>

          <Card className="shadow rounded-4">
            <Card.Body>

              <h3 className="text-center mb-4">Signup Form</h3>

              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="signupEmail" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="signupPassword" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                  Signup
                </Button>
              </Form>

              <div className="mt-3 text-center">
                Already have account <Link to="/login">Login</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
