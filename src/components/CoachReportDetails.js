import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "./Report.css";

const CoachReportDetails = () => {
  const location = useLocation();
  const report = location.state; // Get passed report data
  const [uploadedImages, setUploadedImages] = useState({});

  if (!report) {
    return (
      <Container>
        <h2 className="text-center mt-4">⚠️ No Report Data Available</h2>
        <p>Please create a report first.</p>
      </Container>
    );
  }

  const handleImageUpload = (event, diagnosisId) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages((prev) => ({ ...prev, [diagnosisId]: imageUrl }));
    }
  };

  return (
    <Container className="mt-4 coach-report">
      <h2 className="text-center report-title mb-4">
        🎾 Utviklingsrapport for {report.playerName}
      </h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body className="player-info">
          <h4>👤 Spiller: {report.playerName}</h4>
          <h5>📌 Teknisk nivå: {report.technicalLevel}</h5>
        </Card.Body>
      </Card>

      <h4 className="section-title">🎯 Valgte arbeidsoppgaver</h4>
      <Row>
        {report.selectedTasks.length > 0 ? (
          report.selectedTasks.map((task, index) => (
            <Col md={12} key={index}>
              <Card className="mb-4 task-card shadow-sm">
                <Card.Body>
                  <h5 className="task-title">
                    {task.category} - {task.name}
                  </h5>
                  <p
                    className="task-description"
                    dangerouslySetInnerHTML={{ __html: task.description }}
                  />
                  {task.picture_url && (
                    <div className="task-image-container">
                      <img
                        src={task.picture_url}
                        alt="Thumbnail"
                        className="img-fluid task-img"
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted">Ingen arbeidsoppgaver valgt.</p>
        )}
      </Row>

      <h4 className="section-title">🩺 Vurdering og tiltak</h4>
      {Object.keys(report.selectedDiagnosis).length > 0 ? (
        Object.entries(report.selectedDiagnosis).map(([taskId, diagnoses]) => (
          <Card key={taskId} className="mb-4 diagnosis-card shadow-sm">
            <Card.Body>
              <h4 className="diagnosis-task-title">
                {report.selectedTasks.find((t) => t.id === parseInt(taskId))
                  ?.full_name || "Ukjent oppgave"}
              </h4>
              <p>
                {report.selectedTasks.find((t) => t.id === parseInt(taskId))
                  ?.description || "Ukjent oppgave"}
              </p>

              {diagnoses.map((diagnosis, index) => (
                <Row key={index} className="diagnosis-section">
                  <Col md={6} className="diagnosis-col">
                    <h5 className="diagnosis-title">🛑 Diagnose</h5>
                    <p
                      className="diagnosis-text"
                      dangerouslySetInnerHTML={{ __html: diagnosis.diagnosis }}
                    />
                    <div className="text-center mt-2">
                      {uploadedImages[diagnosis.id] ? (
                        <img
                          src={uploadedImages[diagnosis.id]}
                          alt="Custom Diagnosis"
                          className="img-fluid diagnosis-img"
                        />
                      ) : (
                        diagnosis.diagnosis_picture_url && (
                          <img
                            src={diagnosis.diagnosis_picture_url}
                            alt="Diagnose"
                            className="img-fluid diagnosis-img"
                          />
                        )
                      )}
                    </div>
                    <Form.Group className="mt-2">
                      <Form.Label>Endre bilde:</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, diagnosis.id)}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6} className="measure-col">
                    <h5 className="measure-title">✅ Tiltak</h5>
                    <p
                      className="measure-text"
                      dangerouslySetInnerHTML={{ __html: diagnosis.measure }}
                    />
                    {diagnosis.measure_picture_url && (
                      <img
                        src={diagnosis.measure_picture_url}
                        alt="Tiltak"
                        className="img-fluid measure-img"
                      />
                    )}
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Ingen diagnoser valgt.</p>
      )}

      <div className="text-center mt-4">
        <Button
          variant="primary"
          onClick={() => window.print()}
          className="print-btn"
        >
          Send til spiller
        </Button>
      </div>
    </Container>
  );
};

export default CoachReportDetails;
