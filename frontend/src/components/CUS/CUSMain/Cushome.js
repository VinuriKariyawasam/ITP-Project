import React ,{useContext} from "react";
import "./Cushome.css";
import { CusAuthContext } from "../../../context/cus-authcontext";
import Button from "react-bootstrap/Button";
import Card1 from "./homeicon/card1";
import Card2 from "./homeicon/card2";
import Card3 from "./homeicon/card3";
import Card4 from "./homeicon/card4";
import img2 from "../../../images/Cushome/Products.jpg";
import img1 from "../../../images/Cushome/appointment.jpg";
import { Link } from 'react-router-dom';

function Cushome() {
  const cusauth = useContext(CusAuthContext);
  return (
    <main id="cusmainhome" className="cusmainhome">
      <h1>Hello {cusauth.token}</h1>
      <h1 className="homeh2">
        Experience Excellence in Car
        <br /> Service and Repair
      </h1>
      <hr />
      <Card1 />
      <hr />
      <Card2 />
      <Card3 />
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>

  <img className="cushomeimg" src={img2} style={{ zIndex: 0 }} />
  <div style={{ position: "absolute", marginLeft: "2%", zIndex: 1 }}>
    <p className="cushomep">
      Get genuine products for
      <br /> your vehicle
    </p>
    <p className="cushomep">
      Explore our inventory to buy genuine products.
      <br /> shop woth us online today.
    </p>
    <br />
    <Button variant="light" className="exbtn">
      <b>Book now</b>
    </Button>
  </div>
</div>

      <Card4 />
      <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
  <img className="cushomeimg" src={img1} style={{ zIndex: 0 }} />
  <div style={{ position: "absolute", marginLeft: "2%", zIndex: 1 }}>
    <p
    className="cushomep">
      Book Your Next Service
      <br /> Appointment
    </p>
    <p className="cushomep">
      Experience top-quality automotive services at our center.
      <br /> Schedule your appointment online today.
    </p>
    <br />
    <Link to='http://localhost:3000/customer/appointment/appointnmentMain'>
            <Button variant="light">
              <b>Book now</b>
            </Button>
          </Link>
  </div>
</div>

    </main>
  );
}

export default Cushome;
