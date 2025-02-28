import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  getDrillsForSituationType,
  getKeyPointsForDrills,
} from "../services/api";
import { Card, Row, Col, Button } from "react-bootstrap";

const SituationTypeDetails = () => {
  const { situationType } = useParams(); // ✅ Get SituationType from URL
  const location = useLocation();
  const navigate = useNavigate();
  const levelId = new URLSearchParams(location.search).get("level"); // ✅ Get level ID from query params

  const [drills, setDrills] = useState([]);
  const [keyPoints, setKeyPoints] = useState([]);
  const [selectedDrills, setSelectedDrills] = useState([]); // ✅ Shopping Basket

  useEffect(() => {
    async function fetchData() {
      if (situationType) {
        const drillsData = await getDrillsForSituationType(situationType);
        setDrills(drillsData);

        // ✅ Extract drill IDs to fetch key points
        const drillIds = drillsData.map((drill) => drill.id);
        if (drillIds.length > 0 && levelId) {
          const keyPointsData = await getKeyPointsForDrills(drillIds, levelId);
          setKeyPoints(keyPointsData);
        }
      }

      // ✅ Load selected drills from localStorage
      const savedDrills = localStorage.getItem("selectedDrills");
      if (savedDrills) {
        setSelectedDrills(JSON.parse(savedDrills));
      }
    }
    fetchData();
  }, [situationType, levelId]);

  // ✅ Organize Key Points by Drill ID
  const keyPointsByDrill = keyPoints.reduce((acc, keyPoint) => {
    if (!acc[keyPoint.drill]) {
      acc[keyPoint.drill] = [];
    }
    acc[keyPoint.drill].push(keyPoint.description);
    return acc;
  }, {});

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

  return (
    <div className="row row-margin-top">
      <h2 className="modern-font">
        Øvelser for {situationType} på nivået{" "}
        {keyPoints.length > 0 ? keyPoints[0].level_name : "Ukjent nivå"}
      </h2>

      {/* ✅ Display Drills for this SituationType */}
      <Row>
        {drills.length === 0 ? (
          <p>Ingen øvelser tilgjengelig.</p>
        ) : (
          drills.map((drill) => (
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

                {/* ✅ Display Key Points for this Drill */}
                <Card.Footer>
                  {/* ✅ Drill Description */}
                  <h6>Beskrivelse:</h6>
                  <div
                    dangerouslySetInnerHTML={{ __html: drill.description }}
                  />
                  <hr />

                  {/* ✅ Key Points Section */}
                  <h6>Fokus på:</h6>
                  {keyPointsByDrill[drill.id] &&
                  keyPointsByDrill[drill.id].length > 0 ? (
                    <div>
                      {keyPointsByDrill[drill.id].map((kp, index) => (
                        <p
                          key={index}
                          className="mb-1"
                          style={{ fontSize: "14px" }}
                        >
                          🔹 {kp}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p>Ingen nøkkelpunkter tilgjengelig.</p>
                  )}
                  <hr />

                  {/* ✅ Add Drill to Basket Button */}
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
          ))
        )}
      </Row>

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
    </div>
  );
};

export default SituationTypeDetails;
