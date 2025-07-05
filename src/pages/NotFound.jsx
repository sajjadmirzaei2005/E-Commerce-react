import { Container, Row, Col } from "react-bootstrap";


export default function NotFound() {

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">

      <Row className="text-center">

        <Col>
          <h1 className="display-1 fw-bold text-danger">404</h1>
          <h2 className="mb-3">Page Not Found</h2>
        </Col>

      </Row>

    </Container>
  );
}
