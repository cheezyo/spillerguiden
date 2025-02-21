import React, { useEffect, useState } from "react";
import {
  getTechnicalLevels,
  getTechnicalLevelTasks,
  getDiagnoses,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";

const CoachReport = () => {
  const [technicalLevels, setTechnicalLevels] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("");
  const [taskCategories, setTaskCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [playerName, setPlayerName] = useState("");
  const [diagnoses, setDiagnoses] = useState({});
  const [selectedDiagnosis, setSelectedDiagnosis] = useState({});
  const [selectedMeasure, setSelectedMeasure] = useState({});
  const navigate = useNavigate();
  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getTechnicalLevels();
      setTechnicalLevels(levelsData);
    }
    fetchData();
  }, []);

  const handleLevelChange = async (e) => {
    const levelName = e.target.value;
    setSelectedLevel(levelName);
    setSelectedCategory("");
    setTasks([]);
    setSelectedTasks([]);

    if (levelName) {
      const tasksData = await getTechnicalLevelTasks(levelName);
      const uniqueCategories = [
        ...new Set(tasksData.map((task) => task.category)),
      ];
      setTaskCategories(uniqueCategories);
    }
  };

  const handleCategoryChange = async (e) => {
    const category = e.target.value;
    setSelectedCategory(category);

    if (category && selectedLevel) {
      const tasksData = await getTechnicalLevelTasks(selectedLevel);
      const filteredTasks = tasksData.filter(
        (task) => task.category === category,
      );
      setTasks(filteredTasks);
    }
  };

  const handleTaskSelection = async (task) => {
    const updatedTasks = selectedTasks.includes(task)
      ? selectedTasks.filter((t) => t.id !== task.id)
      : [...selectedTasks, task];

    setSelectedTasks(updatedTasks);

    // 🔥 Fetch only diagnoses related to the selected task
    try {
      const diagnosisData = await getDiagnoses(task.id); // Pass task ID
      setDiagnoses((prev) => ({
        ...prev,
        [task.id]: diagnosisData, // Store only related diagnoses
      }));
    } catch (error) {
      console.error("Error fetching diagnoses:", error);
    }
  };

  const handleDiagnosisSelection = (taskId, diagnosis) => {
    // Limit to max 2 diagnoses (Primary + Secondary)
    if (!selectedDiagnosis[taskId]) {
      setSelectedDiagnosis((prev) => ({
        ...prev,
        [taskId]: [diagnosis],
      }));
    } else if (selectedDiagnosis[taskId].length < 2) {
      setSelectedDiagnosis((prev) => ({
        ...prev,
        [taskId]: [...prev[taskId], diagnosis],
      }));
    } else {
      alert("⚠️ You can only select 2 diagnoses per task.");
    }

    setSelectedMeasure((prev) => ({
      ...prev,
      [taskId]: diagnosis.measure,
    }));
  };

  const handleSubmit = () => {
    const reportData = {
      playerName,
      technicalLevel: selectedLevel,
      selectedTasks,
      selectedDiagnosis,
    };
    navigate("/coach-report-details", { state: reportData });
  };

  return (
    <Container>
      <h2 className="text-center mb-4">Utviklingsrapport</h2>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Spiller</Form.Label>
            <Form.Control
              type="text"
              placeholder="Navn"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Spillerens tekniske nivå:</Form.Label>
            <Form.Select value={selectedLevel} onChange={handleLevelChange}>
              <option value=""></option>
              {technicalLevels.map((level) => (
                <option key={level.id} value={level.name}>
                  {level.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          {taskCategories.length > 0 && (
            <Form.Group className="mb-3">
              <Form.Label>Velg slag:</Form.Label>
              <Form.Select
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value=""></option>
                {taskCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          )}
        </Col>

        <Col md={6}>
          <h4>Tekniske arbeidsoppgaver</h4>
          {tasks.length === 0 ? (
            <p>No tasks available for this category.</p>
          ) : (
            <ul className="list-group">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`list-group-item ${selectedTasks.includes(task) ? "active" : ""}`}
                  onClick={() => handleTaskSelection(task)}
                  style={{ cursor: "pointer" }}
                >
                  {task.name}
                </li>
              ))}
            </ul>
          )}
        </Col>
      </Row>
      <hr />
      {/* ✅ Diagnosis Section */}
      {selectedTasks.length > 0 && (
        <Row className="mt-4">
          <Col>
            <h4>Diagnose og Tiltak</h4>
            <br />
            {selectedTasks.map((task) => (
              <div key={task.id} className="mb-3">
                <h5>{task.full_name}</h5>
                {diagnoses[task.id] && diagnoses[task.id].length > 0 ? (
                  <Form.Select
                    onChange={(e) =>
                      handleDiagnosisSelection(
                        task.id,
                        JSON.parse(e.target.value),
                      )
                    }
                  >
                    <option value="">Velg vurdering...</option>
                    {diagnoses[task.id].map((diagnosis) => (
                      <option
                        key={diagnosis.id}
                        value={JSON.stringify(diagnosis)}
                      >
                        {stripHtmlTags(diagnosis.diagnosis)}
                      </option>
                    ))}
                  </Form.Select>
                ) : (
                  <p>No diagnoses available.</p>
                )}

                {/* ✅ Show Measure when Diagnosis is Selected */}
                {selectedDiagnosis[task.id] && (
                  <div className="mt-2">
                    <strong>Tiltak:</strong>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: selectedMeasure[task.id],
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </Col>
        </Row>
      )}

      <Button variant="success" className="mt-4" onClick={handleSubmit}>
        Generate Report
      </Button>
    </Container>
  );
};

export default CoachReport;
