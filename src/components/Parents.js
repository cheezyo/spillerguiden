import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import "./Parents.css";

const Parents = () => {
  return (
    <Container className="parents-container">
      <h2 className="text-center mb-4">📋 Parent Guidance Report</h2>
      <Card className="shadow-lg parent-card">
        <Card.Body>
          <h3 className="text-center report-title">Guidance for Your Child</h3>
          <p className="text-center text-muted">
            Based on input and development model recommendations.
          </p>

          {/* ✅ Child Info */}
          <Row className="info-section">
            <Col md={6}>
              <h5>
                👤 Child Name:{" "}
                <span className="info-highlight">Alex Johnsen</span>
              </h5>
            </Col>
            <Col md={6}>
              <h5>
                📅 Age: <span className="info-highlight">10 years</span>
              </h5>
            </Col>
          </Row>

          {/* ✅ Suggested Training Plan */}
          <Row className="training-section mt-4">
            <Col md={12}>
              <h4 className="section-title">🎾 Training Recommendations</h4>
              <ul className="training-list">
                <li>
                  ✅ <strong>Recommended Weekly Practice:</strong> 5 hours
                </li>
                <li>
                  ✅ <strong>Solo Training:</strong> 2 hours
                </li>
                <li>
                  ✅ <strong>Physical Training:</strong> 1-2 hours
                </li>
                <li>
                  ✅ <strong>Participate in other sports:</strong> 3-5 hours
                </li>
                <li>
                  ✅ <strong>Rest Weeks Per Year:</strong> 6 weeks
                </li>
              </ul>
            </Col>
          </Row>

          {/* ✅ Tournament Guidance */}
          <Row className="tournament-section mt-4">
            <Col md={12}>
              <h4 className="section-title">🏆 Tournament Recommendations</h4>
              <ul className="tournament-list">
                <li>
                  🎯 <strong>Yearly Tournaments:</strong> 10
                </li>
                <li>
                  🎯 <strong>Recommended Match Play:</strong> 30 Singles / 20
                  Doubles
                </li>
                <li>
                  🎯 <strong>International Travel:</strong> ❌ Not Required
                </li>
                <li>
                  🔄 Balance between training & competition (70% training, 30%
                  matches)
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="tournament-section mt-4">
            <Col md={12}>
              <p>
                Based on our AI analysis, Alex’s strength lies in consistency
                and rally tolerance. The AI recommends prioritizing **aggressive
                baseline play**, **faster recovery between shots**, and
                **developing serve placement**. By **age 12**, Alex should be
                competing at a **higher national level** with increased **match
                play experience**.
              </p>
            </Col>
          </Row>

          {/* ✅ Next Steps */}
          <div className="text-center mt-4">
            <Button variant="primary" className="me-3">
              📄 Download PDF
            </Button>
            <Button variant="success">🔄 Generate New Report</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Parents;
