import React from "react";
import "./CAM_main.css";
import CAM_dashboard from "./CAM_dashboard";
import CAM_pageTitle from "./CAM_pageTitle";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import feedbackimg1 from "../../../images/cam/feedbackimg1.jpeg";
import feedbackimg2 from "../../../images/cam/feedbackimg2.jpeg";
import feedbackimg3 from "../../../images/cam/feedbackimg3.jpeg";
import { Link } from "react-router-dom";

function CAM_main({ toggleLoading }) {
  return (
    <main id="main" className="cam-main">
      <CAM_pageTitle title="Customer Affairs Management Dashboard" url="/cam" />
      <CAM_dashboard toggleLoading={toggleLoading} />
      <Row>
        <Col>
          <Link to="/staff/cam/con_support">
            <div class="card mb-3">
              <img src={feedbackimg2} class="card-img-top" alt="..." />
              <div class="card-body">
                <h3 class="card-title">Consultancy Support</h3>
                <p class="card-text">
                  Consultancy Support within 24 hours just to make sure to our
                  valuble customers that we are within the range of finger tip.
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/staff/cam/feedback_review">
            <div class="card mb-3">
              <img src={feedbackimg1} class="card-img-top" alt="..." />
              <div class="card-body">
                <h3 class="card-title">FeedBack Review</h3>
                <p class="card-text">
                  Always reviewing what our customers thoughts on us and
                  continousely growing up to be the best version in the
                  industry.
                </p>
              </div>
            </div>
          </Link>
        </Col>
        <Col>
          <Link to="/staff/cam/faq_review">
            <div class="card mb-3">
              <img src={feedbackimg3} class="card-img-top" alt="..." />
              <div class="card-body">
                <h3 class="card-title">Frequently Asked Questions</h3>
                <p class="card-text">
                  Collection of valuable advices we have given to our customers
                  ; so others won't have to ask!!
                </p>
              </div>
            </div>
          </Link>
        </Col>
      </Row>
    </main>
  );
}

export default CAM_main;
