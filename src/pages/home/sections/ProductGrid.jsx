import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductGrid() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=8')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products: ', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center py-5">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container className="my-5">

      <h1>Special Products</h1>

      <Row className="g-4">

        {products.map(product => (

          <Col key={product.id} xs={6} sm={4} md={3}>

            <Card className="h-100 d-flex flex-column">
              <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', overflow: 'hidden' }}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  alt={product.title}
                  className="img-fluid h-100 object-fit-contain"
                />
              </div>
              <Card.Body className="d-flex flex-column text-center">
                <Card.Title className="fs-6">{product.title}</Card.Title>
                <Card.Text className="fs-5 fw-bold mt-auto">

                  ${product.price}

                </Card.Text>

                <Link to={`/products/${product.id}`}>
                  <Button variant='primary form-control'>View</Button>
                </Link>

              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">

        <Button variant="success form-control" onClick={() => navigate('/products')}>
          All Products
        </Button>

      </div>
    </Container>
  );
}
