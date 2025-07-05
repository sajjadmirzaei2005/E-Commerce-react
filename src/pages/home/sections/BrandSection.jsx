import { Carousel, Image, Row, Col } from 'react-bootstrap';
import '../../../styles/brandSection.css';


const brandLogos = Array.from({ length: 9 }, (_, i) => ({
  src: `/assets/brands/brandLogo${i + 1}.png`,

}));


const chunkArray = (array, size) =>
  array.reduce((acc, _, i) => (i % size === 0 ? [...acc, array.slice(i, i + size)] : acc), []);


export default function BrandSection() {

  const groupedBrands = chunkArray(brandLogos, 3);

  return (
    <div>

      <h1 className='container'>Brands</h1>

      <Carousel data-bs-theme="dark" className="container my-3">

        {groupedBrands.map((group, index) => (
          <Carousel.Item key={index} className="mb-5">

            <Row className="justify-content-center">

              {group.map((brand, idx) => (
                <Col key={idx} md={4}>
                  <Image src={brand.src} />
                </Col>
              ))}

            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>

  );
}