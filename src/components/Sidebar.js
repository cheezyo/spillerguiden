import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLevels, getTechnicalLevels } from "../services/api";
import { Accordion, ListGroup, Card } from "react-bootstrap";
import "./Sidebar.css";

const Sidebar = () => {
  const [levels, setLevels] = useState([]);
  const [technicalLevels, setTechnicalLevels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getLevels();
      const sortedLevels = levelsData.sort(
        (a, b) => b.order_number - a.order_number,
      );
      setLevels(sortedLevels);

      const technicalLevelsData = await getTechnicalLevels();
      const sortedTechnicalLevels = technicalLevelsData.sort(
        (a, b) => b.order_number - a.order_number,
      );
      setTechnicalLevels(sortedTechnicalLevels);
    }
    fetchData();
  }, []);

  return (
    <div className="sidebar-modern">
      {/* ✅ Home Link */}
      <h4 className="sidebar-title">Spillerguiden</h4>
      <ListGroup variant="flush" className="mb-3">
        <ListGroup.Item action as={Link} to="/">
          🏠 Hjem
        </ListGroup.Item>
      </ListGroup>

      <Accordion defaultActiveKey="">
        {/* ✅ Player Levels Accordion */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>🎾Spiller nivåer</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action as={Link} to="/levels">
                📋 Alle spille nivåer
              </ListGroup.Item>
              {levels.map((level) => (
                <ListGroup.Item
                  key={level.id}
                  action
                  as={Link}
                  to={`/level/${level.id}`}
                >
                  {level.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>

        {/* ✅ Technical Levels Accordion */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>📊 Tekkniske nivåer</Accordion.Header>
          <Accordion.Body>
            <ListGroup variant="flush">
              <ListGroup.Item action as={Link} to="/technical-levels">
                🛠️ Alle tekkniske nivåer
              </ListGroup.Item>
              {technicalLevels.map((techLevel) => (
                <ListGroup.Item
                  key={techLevel.id}
                  action
                  as={Link}
                  to={`/technical-level/${techLevel.name}`}
                >
                  {techLevel.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* ✅ Coach Report Button */}
      <Card className="mt-3">
        <Card.Body>
          <Link to="/coach-report" className="btn btn-primary w-100">
            📝 Trener rapport
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;
