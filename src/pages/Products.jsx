import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Pagination, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function Products() {

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const ProductsPerPage = 12;


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setAllProducts(data);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);


  useEffect(() => {

    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, allProducts]);


  const indexOfLastProduct = currentPage * ProductsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - ProductsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / ProductsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <>

          <Form className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search products ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>


          <div className="mb-4 text-center">
            <div className="d-flex flex-wrap justify-content-center gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>


          <Row>
            {currentProducts.map((product) => (
              <Col key={product.id} xs={6} sm={6} md={3} className="mb-4">
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <Card.Body className="d-flex flex-column text-center">
                    <Card.Title className="fs-6">{product.title}</Card.Title>
                    <Card.Text className="fs-5 fw-bold mt-auto">${product.price}</Card.Text>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="success" className="form-control">View</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>


          <div className="d-flex justify-content-center">
            <Pagination>
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>
        </>
      )}
    </Container>
  );
};