import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { ArrowUp } from 'react-bootstrap-icons';

export default function ScrollButton() {

  const [visible, setVisible] = useState(false);


  useEffect(() => {

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);

  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (

    visible && (

      <Button
        onClick={scrollToTop}
        variant="primary"
        className="position-fixed"
        style={{
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
        }}
      >
        <ArrowUp />
      </Button>
    )
  );
};
