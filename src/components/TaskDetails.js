import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button } from "react-bootstrap";
import { getTacticalTask, getDrillsForTask } from "../services/api";
import "./LevelsList.css";

const TaskDetails = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [drills, setDrills] = useState([]);
  const [selectedDrills, setSelectedDrills] = useState([]);

  useEffect(() => {
    async function fetchTaskDetails() {
      const taskData = await getTacticalTask(taskId);
      setTask(taskData);

      const drillData = await getDrillsForTask(taskId);
      setDrills(drillData);
    }
    fetchTaskDetails();

    // ✅ Load drills from localStorage
    const savedDrills = localStorage.getItem("selectedDrills");
    if (savedDrills) {
      setSelectedDrills(JSON.parse(savedDrills));
    }
  }, [taskId]);

  // ✅ Add Drill to Shopping Basket & Save to Local Storage
  const addDrillToBasket = (drill) => {
    if (!selectedDrills.find((d) => d.id === drill.id)) {
      const updatedDrills = [...selectedDrills, { ...drill, duration: 10 }]; // Default duration 10 min
      setSelectedDrills(updatedDrills);
      localStorage.setItem("selectedDrills", JSON.stringify(updatedDrills)); // ✅ Save to localStorage
    }
  };

  // ✅ Remove Drill from Basket
  const removeDrillFromBasket = (drillId) => {
    const updatedDrills = selectedDrills.filter(
      (drill) => drill.id !== drillId,
    );
    setSelectedDrills(updatedDrills);
    localStorage.setItem("selectedDrills", JSON.stringify(updatedDrills)); // ✅ Update localStorage
  };

  // ✅ Navigate to Training Plan Page with Selected Drills
  const goToTrainingPlan = () => {
    navigate("/training-plan", { state: { drills: selectedDrills } });
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div>
      <div className="row row-margin-top">
        <div className="col-md-6">
          <h2 className="modern-font">{task.name}</h2>
          <div dangerouslySetInnerHTML={{ __html: task.description }} />
        </div>

        <div className="col-md-4">
          {task.video_url ? (
            <iframe
              width="100%"
              height="250"
              src={task.video_url}
              title={task.name}
              allowFullScreen
            ></iframe>
          ) : (
            <p>Ingen video tilgjengelig.</p>
          )}
        </div>
      </div>

      <h3 className="modern-font">Øvelser for å trene på ferdigheten:</h3>
      <hr />

      {drills.length === 0 ? (
        <p>Ingen øvelser tilgjengelig.</p>
      ) : (
        <Row>
          {drills.map((drill) => (
            <Col md={4} key={drill.id} className="mb-3">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{drill.name}</Card.Title>

                  <div className="drill-card-content">
                    {drill.video_url ? (
                      <iframe
                        width="100%"
                        height="200"
                        src={drill.video_url}
                        title={drill.name}
                        allowFullScreen
                      ></iframe>
                    ) : drill.picture_url ? (
                      <Card.Img
                        variant="top"
                        src={drill.picture_url}
                        alt={drill.name}
                        className="drill-card-img"
                      />
                    ) : (
                      <Card.Text>"No video or picture"</Card.Text>
                    )}
                  </div>
                </Card.Body>

                <Card.Footer>
                  <div
                    dangerouslySetInnerHTML={{ __html: drill.description }}
                  />
                  <hr />
                  <Button
                    variant="success"
                    className="my-1"
                    onClick={() => addDrillToBasket(drill)}
                  >
                    ➕ Legg til i plan
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* ✅ Shopping Basket Summary (Persistent Across Pages) */}
      {selectedDrills.length > 0 && (
        <div className="mt-4 p-3 border rounded">
          <h5>Valgte Øvelser:</h5>
          <table className="custom-table">
            <tHead>
              <tr>
                <th>Navn</th>
                <th>Varighet</th>
                <th></th>
              </tr>
            </tHead>
            <tbody>
              {selectedDrills.map((drill) => (
                <tr key={drill.id}>
                  <td> {drill.name}</td>
                  <td>({drill.duration} min) </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeDrillFromBasket(drill.id)}
                    >
                      ❌ Fjern
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button className="my-3" variant="success" onClick={goToTrainingPlan}>
            📋 Gå til treningsplan →
          </Button>
        </div>
      )}

      <p>
        {task.level && (
          <Link to={`/level/${task.level}`} className="btn btn-primary mt-3">
            ← Tilbake til {task.level_name}
          </Link>
        )}
      </p>
    </div>
  );
};

export default TaskDetails;
