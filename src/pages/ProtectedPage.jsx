import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';


export default function ProtectedPage() {
  
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Container className="mt-5 d-flex justify-content-center">

      <Card className="p-4 shadow" style={{ width: '500px' }}>
        <h3 className="text-center mb-3">Protected Page</h3>
        <p className="text-center">You are successfully logged in and have access to this page.</p>
      </Card>
    </Container>
  );
};
