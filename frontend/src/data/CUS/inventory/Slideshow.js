import Carousel from 'react-bootstrap/Carousel';
import Slide1 from '../../../images/Inventory/Slide1.jpg'
import Slide2 from '../../../images/Inventory/Slide2.jpg'
import Slide3 from '../../../images/Inventory/Slide3.png'
import './Slideshow.css'
function DarkVariantExample() {
  return (
    
    <Carousel className='ProductsSldieshowcss' > 
      <Carousel.Item interval={2000} >
      <img
          className="d-block "
          src={Slide1}
          alt="First slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={2000}>
      <img
          className="d-block "
          src={Slide2}
          alt="Second slide"
        />
        
      </Carousel.Item>
      <Carousel.Item interval={2000}>
      <img
          className="d-block"
          src={Slide3}
          alt="Third slide"
        />
        
      </Carousel.Item>
    </Carousel>
    
  );
}

export default DarkVariantExample;