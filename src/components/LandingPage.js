import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <Container className="landing-container">
      {/* ✅ Title Section */}
      <Row className="text-center my-5">
        <Col>
          <h1 className="landing-title">Velkommen til spillerguiden</h1>
          <p className="landing-subtitle">
            En digital guide for spillere, trenere og foreldre.
          </p>
        </Col>
      </Row>

      {/* ✅ Video Section */}
      <Row className="justify-content-center my-4">
        <Col md={7} className="text-center">
          <div className="video-container">
            <iframe
              width="100%"
              height="400"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Intro Video"
              allowFullScreen
            ></iframe>
          </div>
        </Col>
      </Row>

      {/* ✅ Info Cards Section */}
      <Row className="justify-content-center my-4 ">
        <div class="col-md-7 background-blue">
          <Row>
            <div class="col-md-1 small-l first"></div>
            <div class="col-12 col-md-10 big-lg">
              {" "}
              <Button
                as={Link}
                to="/technical-levels"
                variant="primary"
                className="big-btn btn-margin-small"
              >
                Trener
              </Button>
            </div>
            <div class="col-md-1 small-r first"></div>
          </Row>
          <Row>
            <div class="col-md-1 small-l"></div>
            <div class="col-6 col-md-5 big">
              <Button
                as={Link}
                to="/levels"
                variant="primary"
                className="big-btn btn-margin-big"
              >
                Nivå guide
              </Button>
            </div>
            <div class="col-6 col-md-5 big">
              {" "}
              <Button
                as={Link}
                to="/technical-levels"
                variant="primary"
                className="big-btn btn-margin-big"
              >
                Teknisk guide
              </Button>
            </div>
            <div class="col-md-1 small-r"></div>
          </Row>
          <Row></Row>
          <Row>
            <div class="col-md-1 small-l thick-border"></div>
            <div class="col-6 col-md-5 big thick-border">
              <Button
                as={Link}
                to="/technical-levels"
                variant="primary"
                className="big-btn btn-margin-big"
              >
                Spiller
              </Button>
            </div>
            <div class="col-6 col-md-5 big thick-border">
              {" "}
              <Button
                as={Link}
                to="/parents"
                variant="primary"
                className="big-btn btn-margin-big"
              >
                Foreldre
              </Button>
            </div>
            <div class="col-md-1 small-r thick-border"> </div>
          </Row>
          <Row>
            <div class="col-md-1 small-l last"></div>
            <div class="col-12 col-md-10 big-lg">
              {" "}
              <Button
                as={Link}
                to="/technical-levels"
                variant="primary"
                className="big-btn btn-margin-small"
              >
                Rullestolspiller
              </Button>
            </div>
            <div class="col-md-1 small-r last"></div>
          </Row>
        </div>
      </Row>
    </Container>
  );
};

export default LandingPage;
