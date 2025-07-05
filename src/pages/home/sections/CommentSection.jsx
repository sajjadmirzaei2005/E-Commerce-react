import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import userImage from "../../../assets/user.png";


export default function CommentSection() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const someText = "Lorem ipsum dolor sit amet consectetur, adipisicing elit.";


    useEffect(() => {

        fetch('https://fakestoreapi.com/users?limit=6')
            .then(res => res.json())
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch(() => {
                setError("falied to receive users!");
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

    if (error) return <h2 className='text-center my-4'>{error}</h2>;

    return (
        <Container className="my-4">

            <h1>Comments</h1>
            
            {Array.from({ length: Math.ceil(users.length / 3) }, (_, rowIndex) => (

                <Row key={rowIndex} className="mb-4">

                    {users.slice(rowIndex * 3, rowIndex * 3 + 3).map((user, colIndex) => (

                        <Col key={colIndex}>

                            <Card style={{ width: '100%' }} className='border-info'>
                                <Card.Img variant="top" src={userImage} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title>{user.name.firstname} {user.name.lastname}</Card.Title>
                                    <Card.Text>
                                        {someText}
                                    </Card.Text>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
};