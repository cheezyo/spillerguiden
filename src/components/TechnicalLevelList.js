import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTechnicalLevels } from "../services/api";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./TechnicalLevelList.css"; // Add styles for better visuals

const TechnicalLevelList = () => {
  const [technicalLevels, setTechnicalLevels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getTechnicalLevels();
      const sortedLevels = levelsData.sort(
        (a, b) => a.order_number - b.order_number,
      );
      setTechnicalLevels(levelsData);
    }
    fetchData();
  }, []);

  return (
    <Container className="tech-levels-container">
      <h2 className="text-center mb-4">📊 Technical Levels</h2>
      <Row>
        {technicalLevels.map((level) => (
          <Col md={4} key={level.id} className="mb-4">
            <Link
              to={`/technical-level/${level.name}`}
              className="tech-card-link"
            >
              <Card className="tech-card shadow">
                <div className="tech-image-container">
                  <Card.Img
                    variant="top"
                    src={level.picture_url}
                    alt={level.name}
                    className="tech-image"
                  />
                </div>
                <Card.Body className="tech-card-body">
                  <Card.Title className="text-center">{level.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TechnicalLevelList;
