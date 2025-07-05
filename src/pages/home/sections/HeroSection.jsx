import Image from 'react-bootstrap/Image';
import HeroSectionImage from "../../../assets/PhotoShop.png"

export default function HeroSection() {

    return (

        <div className="text-center bg-dark mt-5">

            <Image
                src={HeroSectionImage}
                alt="Hero section"
                fluid

            />

        </div>

    );
}