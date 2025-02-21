import React, { useEffect, useState } from "react";
import { getLevels, getTechnicalLevels } from "../services/api"; // ✅ Fetch both Levels & Technical Levels
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./LevelsList.css";

const LEVEL_COLORS = [
  "#005BAA", // Level 1
  "#BA282E", // Level 2
  "#F1A341", // Level 3
  "#70AD47", // Level 4
  "#005BAA", // Level 5
  "#1F4E79", // Level 6
  "#4B4E6D", // Level 7
  "#70AD47", // Level 8
];

const LevelsList = () => {
  const [levels, setLevels] = useState([]);
  const [technicalLevels, setTechnicalLevels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getLevels();
      const sortedLevels = levelsData.sort(
        (a, b) => a.order_number - b.order_number,
      );

      const techLevelsData = await getTechnicalLevels();
      const sortedTechLevels = techLevelsData.sort(
        (a, b) => a.order_number - b.order_number,
      );

      setLevels(sortedLevels);
      setTechnicalLevels(sortedTechLevels);
    }
    fetchData();
  }, []);

  return (
    <Container className="levels-container">
      <h2 className="text-center mb-4">🎾 Player Development Pathway</h2>

      {/* ✅ Row 1 */}
      <Row className="mb-4">
        <Col md={4}>
          {technicalLevels.find((t) => t.order === 1) && (
            <Card className="tech-level-card">
              <Card.Body>
                <Card.Title className="text-center">
                  {technicalLevels.find((t) => t.order === 1).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={8}>
          {levels.find((l) => l.order_number === 1) && (
            <Card
              className="level-card"
              style={{ backgroundColor: LEVEL_COLORS[0] }}
            >
              <Card.Body>
                <Card.Title className="text-center">
                  {levels.find((l) => l.order_number === 1).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* ✅ Row 2 */}
      <Row className="mb-4">
        <Col md={4}>
          {technicalLevels.find((t) => t.order === 2) && (
            <Card className="tech-level-card">
              <Card.Body>
                <Card.Title className="text-center">
                  {technicalLevels.find((t) => t.order === 2).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={8}>
          {levels.find((l) => l.order_number === 2) && (
            <Card
              className="level-card"
              style={{ backgroundColor: LEVEL_COLORS[1] }}
            >
              <Card.Body>
                <Card.Title className="text-center">
                  {levels.find((l) => l.order_number === 2).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* ✅ Row 3 */}
      <Row className="mb-4">
        <Col md={4}>
          {technicalLevels.find((t) => t.order === 3) && (
            <Card className="tech-level-card">
              <Card.Body>
                <Card.Title className="text-center">
                  {technicalLevels.find((t) => t.order === 3).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
        <Col md={8}>
          {levels.find((l) => l.order_number === 3) && (
            <Card
              className="level-card"
              style={{ backgroundColor: LEVEL_COLORS[2] }}
            >
              <Card.Body>
                <Card.Title className="text-center">
                  {levels.find((l) => l.order_number === 3).name}
                </Card.Title>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      {/* ✅ Rows 4-7 (Stacked with Level 8 on the side) */}
      {[4, 5, 6, 7].map((levelOrder, index) => (
        <Row key={levelOrder} className="mb-4">
          <Col md={4}>
            {technicalLevels.find((t) => t.order === 1) && (
              <Card className="tech-level-card">
                <Card.Body>
                  <Card.Title className="text-center">
                    {technicalLevels.find((t) => t.order === 1).name}
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={4}>
            {levels.find((l) => l.order_number === levelOrder) && (
              <Card
                className="level-card"
                style={{ backgroundColor: LEVEL_COLORS[levelOrder - 1] }}
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    {levels.find((l) => l.order_number === levelOrder).name}
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
          <Col md={4}>
            {levels.find((l) => l.order_number === 8) && index === 0 && (
              <Card
                className="level-card full-height-card"
                style={{ backgroundColor: LEVEL_COLORS[7] }}
              >
                <Card.Body>
                  <Card.Title className="text-center">
                    {levels.find((l) => l.order_number === 8).name}
                  </Card.Title>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default LevelsList;
