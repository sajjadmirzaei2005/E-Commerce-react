import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Row, Col, Card, Image, Badge, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';


export default function SingleProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const {addToCart} = useContext(CartContext);


    const addHandler = ()=>{

        addToCart(product)
        alert("product added to cart")
    }


    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError("failed to connect server!");
            });
    }, [id]);


    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
                <Spinner animation="border" role="status" />
            </Container>
        );
    }


    if (error) {
        return (
            <Container className="text-center mt-5">
                <h4 className="text-danger">{error}</h4>
            </Container>
        );
    }

    return (

        <Container className='mb-5' style={{ marginTop: "100px" }}>

            <Row className="g-4">

                <Col md={6} className="text-center">
                    <Image src={product.image} fluid style={{ maxHeight: '400px', objectFit: 'contain' }} />
                </Col>

                <Col md={6}>
                    <Card className="shadow-sm border-0">

                        <Card.Body>
                            <Card.Title className="mb-3 fw-bold" style={{ fontSize: '1.5rem' }}>
                                {product.title}
                            </Card.Title>
                            <h4 className="text-success mb-3">${product.price}</h4>

                            <Badge bg="secondary" className="mb-3" style={{ fontSize: '0.9rem' }}>
                                {product.category}
                            </Badge>

                            <Card.Text style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                                {product.description}
                            </Card.Text>

                            <Button
                                onClick={addHandler}
                                variant='primary form-control'>
                                Add to cart
                            </Button>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}