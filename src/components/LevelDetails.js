import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getLevels,
  getTacticalTasks,
  getPhysicalTasks,
  getMentalTasks,
  getDrillCountsBySituationType,
} from "../services/api";
import { Accordion, Modal, Button } from "react-bootstrap"; // Import Bootstrap components
import "./LevelsList.css";
import PieChartComponent from "./PieChartComponent";

const LevelDetails = () => {
  const { id } = useParams();
  const [level, setLevel] = useState(null);
  const [tacticalTasks, setTacticalTasks] = useState([]);
  const [mentalTasks, setMentalTasks] = useState([]);
  const [physicalTasks, setPhysicalTasks] = useState([]);
  const [drillCounts, setDrillCounts] = useState({});

  // State for modal pop-ups
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageDesc, setSelectedImageDesc] = useState("");
  const [showTextModal, setShowTextModal] = useState(false);
  const [fullText, setFullText] = useState("");

  // ✅ Fetch tasks separately for each category
  const fetchTasksByType = async (levelId) => {
    try {
      const [tacticalTasks, mentalTasks, physicalTasks] = await Promise.all([
        getTacticalTasks(levelId),
        getMentalTasks(levelId),
        getPhysicalTasks(levelId),
      ]);

      setTacticalTasks(tacticalTasks);
      setMentalTasks(mentalTasks);
      setPhysicalTasks(physicalTasks);

      // ✅ Fetch drill counts separately now that API returns correct format
      await fetchDrillCounts();
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchDrillCounts = async () => {
    try {
      const drillCountsData = await getDrillCountsBySituationType();
      setDrillCounts(drillCountsData); // ✅ Store API response directly
    } catch (error) {
      console.error("Error fetching drill counts:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const levelsData = await getLevels();
      const foundLevel = levelsData.find((l) => l.id.toString() === id);
      setLevel(foundLevel);

      await fetchTasksByType(id);

      const drillCountsData = await getDrillCountsBySituationType(id);
      setDrillCounts(drillCountsData);
    }
    fetchData();
  }, [id]);

  if (!level) return <p>Loading...</p>;

  const handleShowModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowModal(true);
  };
  const handleShowImageModal = (imageUrl, imageDesc) => {
    setSelectedImage(imageUrl);
    setSelectedImageDesc(imageDesc);
    setShowImageModal(true);
  };
  const handleShowTextModal = (text) => {
    setFullText(text);
    setShowTextModal(true);
  };

  return (
    <div>
      <div class="row row-margin-top">
        <div class="col-md-6">
          <h2 class="modern-font">{level.name}</h2>

          {level.required_technical_level && (
            <p>
              <strong>Nødvendig teknisk nivå:</strong>{" "}
              <Link
                to={`/technical-level/${level.required_technical_level.name}`}
              >
                {level.required_technical_level.name}
              </Link>
              <br />
              Hvis du ikke innehar dette tekniske nivået, anbefales det ikke å
              starte med oppgaver relatert til dette nivået.
            </p>
          )}
          <div dangerouslySetInnerHTML={{ __html: level.description }} />
        </div>
        <div class="col-md-4">
          {level.video_url && (
            <iframe
              width="100%"
              height="250"
              src={level.video_url}
              title={level.name}
              allowFullScreen
            ></iframe>
          )}
          <hr />
          <h6 class="modern-font middle">
            Anbefalt treningsmengde (forklaring)
          </h6>
          <div class="table-container">
            <table class="custom-table ">
              <thead>
                <tr>
                  <th>Med trener</th>
                  <th>Egen trening</th>
                  <th>Fysisk trening</th>
                  <th>Andre idretter</th>
                  <th>Tennis fri</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8 timer</td>
                  <td>2 timer</td>
                  <td>4 timer</td>
                  <td>2 timer</td>
                  <td>6 uker</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h6 class="modern-font middle">
            Anbefalt turneringsmengde (forklaring)
          </h6>
          <div class="table-container">
            <table class="custom-table ">
              <thead>
                <tr>
                  <th>Turneringer</th>
                  <th>Single</th>
                  <th>Double</th>
                  <th>Type turneringer</th>
                  <th>Reise internasjonalt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>14</td>
                  <td>30</td>
                  <td>20</td>
                  <td>Nasjonale turneringer</td>
                  <td>Nei</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h3 class="modern-font">Læringsmål i denne perioden:</h3>
          <hr />
          <h4 class="modern-font">Teknisk</h4>
          <ul>
            <li>
              <p>
                Utøver skal på dette stadiet jobbe med teknisknivå{" "}
                <a href="/technical-level/Basis 2">Basis 2</a>
              </p>
            </li>
          </ul>
          {/* ✅ Tasks Accordion Sections */}
          <Accordion>
            {/* Tactical Tasks */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Taktisk</Accordion.Header>
              <Accordion.Body>
                {tacticalTasks.length === 0 ? (
                  <p>Ingen taktiske oppgaver tilgjengelig.</p>
                ) : (
                  Object.entries(
                    tacticalTasks.reduce((groups, task) => {
                      const situationType =
                        task.situation_type?.name || "Ukjent";
                      if (!groups[situationType]) groups[situationType] = [];
                      groups[situationType].push(task);
                      return groups;
                    }, {}),
                  ).map(([situationType, tasks]) => (
                    <div key={situationType} className="table-container">
                      <h4 className="table-title">
                        {situationType}{" "}
                        {drillCounts[situationType] > 0 ? (
                          <Link
                            to={`/situation-type/${encodeURIComponent(situationType)}?level=${id}`}
                          >
                            ({drillCounts[situationType]} øvelser) →
                          </Link>
                        ) : (
                          <span className="drill-count-text">
                            ({drillCounts[situationType]} 0 øvelser)
                          </span>
                        )}
                      </h4>

                      <table className="custom-table">
                        <tbody>
                          {tasks.map((task, index) => (
                            <tr
                              key={task.id}
                              className={
                                index % 2 === 0 ? "even-row" : "odd-row"
                              }
                            >
                              <td>{index + 1}</td>
                              <td>{task.description}</td>
                              <td>
                                {task.video_url && (
                                  <Button
                                    variant="primary"
                                    className="btn-sm"
                                    onClick={() =>
                                      handleShowModal(task.video_url)
                                    }
                                  >
                                    Se video
                                  </Button>
                                )}
                              </td>
                              <td>
                                {task.picture_url && (
                                  <img
                                    src={task.picture_url}
                                    alt="Thumbnail"
                                    className="task-thumbnail"
                                    onClick={() =>
                                      handleShowImageModal(
                                        task.picture_url,
                                        task.picture_desc,
                                      )
                                    }
                                  />
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* Mental Tasks */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Mentalt</Accordion.Header>
              <Accordion.Body>
                {mentalTasks.length === 0 ? (
                  <p>Ingen mentale oppgaver tilgjengelig.</p>
                ) : (
                  <table className="custom-table">
                    <tbody>
                      {mentalTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.description}</td>
                          <td>
                            {task.video_url && (
                              <Button
                                variant="primary"
                                className="btn-sm"
                                onClick={() => handleShowModal(task.video_url)}
                              >
                                Se video
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Accordion.Body>
            </Accordion.Item>

            {/* Physical Tasks */}
            <Accordion.Item eventKey="2">
              <Accordion.Header>Fysisk</Accordion.Header>
              <Accordion.Body>
                {physicalTasks.length === 0 ? (
                  <p>Ingen fysiske oppgaver tilgjengelig.</p>
                ) : (
                  <table className="custom-table">
                    <tbody>
                      {physicalTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.description}</td>
                          <td>
                            {task.video_url && (
                              <Button
                                variant="primary"
                                className="btn-sm"
                                onClick={() => handleShowModal(task.video_url)}
                              >
                                Se video
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      {/* ✅ Pop-up Modal for Full Task Description */}
      <Modal
        show={showTextModal}
        onHide={() => setShowTextModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Full beskrivelse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{fullText}</p>
        </Modal.Body>
      </Modal>

      {/* ✅ Pop-up Modal for Task Videos */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Se video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            width="100%"
            height="350"
            src={selectedVideo}
            title="Task Video"
            allowFullScreen
          ></iframe>
        </Modal.Body>
      </Modal>
      {/* ✅ Pop-up Modal for Task Images (Larger Size) */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg" /* Makes modal larger */
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>🖼️ Se bilde</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img
            src={selectedImage}
            alt="Task"
            className="img-fluid large-modal-img"
          />
        </Modal.Body>
        <Modal.Footer>
          <div dangerouslySetInnerHTML={{ __html: selectedImageDesc }} />
        </Modal.Footer>
      </Modal>
      <hr />
      <p>
        <Link to="/levels" class="btn btn-secondary">
          ← Tilbake til nivåside
        </Link>
      </p>
    </div>
  );
};

export default LevelDetails;
