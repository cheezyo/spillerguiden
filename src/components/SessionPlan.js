import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Row, Col, Form, Button, Table } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { getTacticalTask } from "../services/api";
import "./LevelsList.css";

const SessionPlan = () => {
  const [drills, setDrills] = useState([]);
  const [hideVideos, setHideVideos] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [tasks, setTasks] = useState({});

  useEffect(() => {
    // ✅ Load selected drills from localStorage
    const savedDrills = localStorage.getItem("selectedDrills");
    if (savedDrills) {
      const drillData = JSON.parse(savedDrills);
      setDrills(JSON.parse(savedDrills));
      fetchRelatedTasks(drillData);
    }
  }, []);
  const fetchRelatedTasks = async (drillList) => {
    const taskPromises = drillList.map(async (drill) => {
      const task = await getTacticalTask(drill.task); // ✅ Get task linked to the drill
      return {
        taskId: drill.task,
        taskName: task?.name || "Ukjent oppgave",
        situationType: task?.situation_type?.name || "Ukjent situasjon",
        level: task?.level_name || "Ukjent nivå", // ✅ Store level name
      };
    });

    const taskResults = await Promise.all(taskPromises);
    const taskMap = taskResults.reduce((acc, task) => {
      acc[task.taskId] = task; // ✅ Store full task object
      return acc;
    }, {});

    setTasks(taskMap);
  };

  // ✅ Generate Timeline Data for Visualization
  const generateTimelineData = () => {
    const timelineData = [["Drill", "Start Time", "End Time"]];
    let currentTime = 0;

    drills.forEach((drill) => {
      const duration = drill.duration || 10; // Default 10 min if not set
      const startTime = new Date(0, 0, 0, 0, currentTime); // ✅ Start time in minutes
      const endTime = new Date(0, 0, 0, 0, currentTime + duration); // ✅ End time in minutes

      timelineData.push([drill.name, startTime, endTime]);
      currentTime += duration;
    });

    return timelineData;
  };

  return (
    <div className="container mt-4">
      <h2>📋 Øktplan</h2>
      
      {/* ✅ Checkbox to Hide Videos & Images */}
      <div className="mb-3">
        <Form.Check
          type="checkbox"
          label="Skjul alle videoer"
          checked={hideVideos}
          onChange={() => setHideVideos(!hideVideos)}
        />
        <Form.Check
          type="checkbox"
          label="Skjul alle bilder"
          checked={hideImages}
          onChange={() => setHideImages(!hideImages)}
        />
      </div>

      {drills.length === 0 ? (
        <p>Ingen øvelser valgt.</p>
      ) : (
        <Row>
          {drills.map((drill) => (
            <Col md={6} key={drill.id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{drill.name}</Card.Title>

                  <Row>
                    {/* ✅ Video (Hidden if Checkbox Checked) */}
                    {!hideVideos && drill.video_url && (
                      <Col md={6}>
                        <iframe
                          width="100%"
                          height="200"
                          src={drill.video_url}
                          title={drill.name}
                          allowFullScreen
                        ></iframe>
                      </Col>
                    )}

                    {/* ✅ Image (Hidden if Checkbox Checked) */}
                    {!hideImages && drill.picture_url && (
                      <Col md={6}>
                        <Card.Img
                          variant="top"
                          src={drill.picture_url}
                          alt={drill.name}
                          className="drill-card-img"
                        />
                      </Col>
                    )}
                  </Row>
                </Card.Body>

                {/* ✅ Description in Footer */}
                <Card.Footer>
                  <div
                    dangerouslySetInnerHTML={{ __html: drill.description }}
                  />
                  <p>
                    <strong>Varighet:</strong> {drill.duration} min
                  </p>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ✅ Timeline Visualization */}
      {drills.length > 0 && (
        <div className="mt-4">
          <h3>📊 Tidslinje for økten</h3>
          <Chart
            chartType="Timeline"
            width="100%"
            height="auto"
            data={generateTimelineData()}
            options={{
              timeline: { showRowLabels: true },
              hAxis: {
                title: "Tid (minutter)",
                format: "HH:mm", // ✅ Forces Google Charts to show time in "minutes"
              },
              tooltip: { trigger: "both" }, // ✅ Ensures tooltips are visible on hover
            }}
          />
        </div>
      )}
      {/* ✅ Related Tasks Table */}
      {Object.keys(tasks).length > 0 && (
        <div className="">
          <h3>📋 Taktiske situasjoner i økten:</h3>
          <Table bordered>
            <thead>
              <tr>
                <th>Oppgave</th>
                <th>Situasjon</th>
                <th>Nivå</th>
              </tr>
            </thead>
            <tbody>
              {drills.map((drill) => (
                <tr key={drill.id}>
                  <td>{tasks[drill.task]?.taskName || "Ukjent oppgave"}</td>
                  <td>
                    {tasks[drill.task]?.situationType || "Ukjent situasjon"}
                  </td>
                  <td>{tasks[drill.task]?.level || "Ukjent nivå"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
      <hr />
      <Link to="/training-plan" className="btn btn-secondary">
        ← Tilbake til treningsplan
      </Link>
    </div>
  );
};

export default SessionPlan;
