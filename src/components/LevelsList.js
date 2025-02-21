import React, { useEffect, useState } from "react";
import { getLevels } from "../services/api";
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

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getLevels();
      // Sort levels in ascending order of order_number
      const sortedLevels = levelsData.sort(
        (a, b) => a.order_number - b.order_number,
      );
      setLevels(sortedLevels);
    }
    fetchData();
  }, []);

  return (
    <Container className="levels-container">
      <div class="col-md-8">
        <h3>
          Spillernivåer{" "}
          <small class="text-muted">(nødvendig teknisknivå) </small>
        </h3>
        <hr />
      </div>
      <Row className="custom-grid">
        {/* Left Side (Levels 4-7 stacked) */}
        <Col md={4} className="stacked-left">
          {levels
            .slice(3, 7)
            .reverse()
            .map((level, index) => (
              <Link
                to={`/level/${level.id}`}
                key={level.id}
                className={`level-card-link ${level.order_number === 4 ? "mobile-margin" : ""}`}
              >
                <Card
                  className="level-card stacked-card"
                  style={{
                    backgroundColor: LEVEL_COLORS[level.order_number - 1],
                  }}
                >
                  <Card.Body>
                    <Card.Title className="text-center text-white">
                      {level.name}{" "}
                      <small> ({level.required_technical_level.name})</small>
                    </Card.Title>
                    <Card.Text className="text-white">
                      {level.short_desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            ))}
        </Col>

        {/* Right Side (Level 8 fills full height of 4-7) */}
        <Col md={4} className="full-height level-list">
          {levels.length > 7 && (
            <Link to={`/level/${levels[7].id}`} className="level-card-link">
              <Card
                className="level-card full-height-card"
                style={{ backgroundColor: LEVEL_COLORS[7] }}
              >
                <Card.Body>
                  <Card.Title className="text-center text-white">
                    {levels[7].name}{" "}
                    <small> ({levels[7].required_technical_level.name})</small>
                  </Card.Title>
                  <Card.Text className="text-white">
                    {levels[7].short_desc}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          )}
        </Col>
      </Row>

      {/* Levels 1, 2, 3 at the Bottom */}
      <Row>
        {levels
          .slice(0, 3)
          .reverse()
          .map((level) => (
            <Col md={8} key={level.id} className="mb-4 level-list">
              <Link to={`/level/${level.id}`} className="level-card-link">
                <Card
                  className="level-card full-width-card"
                  style={{
                    backgroundColor: LEVEL_COLORS[level.order_number - 1],
                  }}
                >
                  <Card.Body>
                    <Card.Title className="text-center text-white">
                      {level.name}{" "}
                      <small>
                        {level.required_technical_level
                          ? `(${level.required_technical_level.name})`
                          : ""}
                      </small>
                    </Card.Title>
                    <Card.Text className="text-center text-white">
                      {level.short_desc}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default LevelsList;
