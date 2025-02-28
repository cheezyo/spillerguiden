import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Form } from "react-bootstrap";
import "./LevelsList.css";

const TrainingPlan = () => {
  const [drills, setDrills] = useState([]);

  useEffect(() => {
    // ✅ Load drills from localStorage when page loads
    const savedDrills = localStorage.getItem("selectedDrills");
    if (savedDrills) {
      setDrills(JSON.parse(savedDrills));
    }
  }, []);

  // ✅ Change Drill Duration
  const updateDuration = (id, duration) => {
    const updatedDrills = drills.map((drill) =>
      drill.id === id ? { ...drill, duration: duration } : drill,
    );
    setDrills(updatedDrills);
    localStorage.setItem("selectedDrills", JSON.stringify(updatedDrills)); // ✅ Save updated drills
  };

  // ✅ Rearrange Drills
  const moveDrill = (index, direction) => {
    const newDrills = [...drills];
    const targetIndex = index + direction;

    if (targetIndex >= 0 && targetIndex < newDrills.length) {
      [newDrills[index], newDrills[targetIndex]] = [
        newDrills[targetIndex],
        newDrills[index],
      ];
      setDrills(newDrills);
      localStorage.setItem("selectedDrills", JSON.stringify(newDrills)); // ✅ Save order
    }
  };

  // ✅ Remove Drill from Training Plan
  const removeDrill = (id) => {
    const updatedDrills = drills.filter((drill) => drill.id !== id);
    setDrills(updatedDrills);
    localStorage.setItem("selectedDrills", JSON.stringify(updatedDrills)); // ✅ Save updated list
  };

  // ✅ Empty All Drills
  const clearAllDrills = () => {
    setDrills([]);
    localStorage.removeItem("selectedDrills"); // ✅ Remove from localStorage
  };

  return (
    <div className="container mt-4">
      <h2>📋 Treningsplan</h2>
      {drills.length === 0 ? (
        <p>Ingen øvelser valgt.</p>
      ) : (
        <>
          <Table bordered>
            <thead>
              <tr>
                <th>Øvelse</th>
                <th>Varighet (min)</th>
                <th>Handlinger</th>
              </tr>
            </thead>
            <tbody>
              {drills.map((drill, index) => (
                <tr key={drill.id}>
                  <td>{drill.name}</td>
                  <td>
                    <Form.Control
                      type="number"
                      min="1"
                      value={drill.duration}
                      onChange={(e) =>
                        updateDuration(drill.id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <Button
                      variant="light"
                      onClick={() => moveDrill(index, -1)}
                    >
                      ⬆
                    </Button>
                    <Button
                      className="mx-2"
                      variant="light"
                      onClick={() => moveDrill(index, 1)}
                    >
                      ⬇
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => removeDrill(drill.id)}
                    >
                      ❌
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* ✅ "Clear All Drills" Button */}
          <Button variant="danger" className="mt-3" onClick={clearAllDrills}>
            🗑️ Tøm alle øvelser
          </Button>
        </>
      )}

      <hr />
      <Link to="/levels" className="btn btn-secondary me-2">
        ← Tilbake til nivåsiden
      </Link>
      <Link to="/session-plan" className="btn btn-success">
        📋 Vis øktplan
      </Link>
    </div>
  );
};

export default TrainingPlan;
