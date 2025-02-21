import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Accordion, Button, Modal } from "react-bootstrap";
import { getTechnicalLevelTasks, getTechnicalLevels } from "../services/api";

const TechnicalLevelDetails = () => {
  const { name } = useParams();
  const [tasks, setTasks] = useState([]);
  const [technicalLevel, setTechnicalLevel] = useState(null);

  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageDesc, setSelectedImageDesc] = useState("");

  const handleShowVideoModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setShowVideoModal(true);
  };

  const handleShowImageModal = (imageUrl, imageDesc) => {
    setSelectedImage(imageUrl);
    setSelectedImageDesc(imageDesc);
    setShowImageModal(true);
  };

  useEffect(() => {
    async function fetchData() {
      console.log("📡 Fetching Technical Level for:", name);

      try {
        const levelsData = await getTechnicalLevels();
        const foundLevel = levelsData.find(
          (level) =>
            level.name.toLowerCase() === decodeURIComponent(name).toLowerCase(),
        );

        if (!foundLevel) {
          console.error("❌ No Technical Level found!");
          return;
        }

        console.log("✅ Technical Level Found:", foundLevel);
        setTechnicalLevel(foundLevel);

        // ✅ Fetch `TechnicalLevelTasks` using the correct `technical_level.name`
        const tasksData = await getTechnicalLevelTasks(foundLevel.name);
        console.log("✅ Technical Level Tasks Data:", tasksData);
        setTasks(tasksData);
      } catch (error) {
        console.error("❌ Error fetching Technical Level or Tasks:", error);
      }
    }

    if (name) {
      fetchData();
    } else {
      console.error("❌ No level name detected!");
    }
  }, [name]);

  if (!technicalLevel) return <p>Loading...</p>;

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          <h2>Teknisk nivå: {technicalLevel.name}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: technicalLevel.description }}
          />
        </div>
        <div className="col-md-4">
          {technicalLevel.video_url && (
            <div className="video-container">
              <iframe
                width="100%"
                height="250"
                src={technicalLevel.video_url}
                title={technicalLevel.name}
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <h3>Teknisk sjekkliste:</h3>
          {tasks.length === 0 ? (
            <p>Ingenting å vise enda</p>
          ) : (
            <Accordion>
              {Object.entries(
                tasks.reduce((acc, task) => {
                  if (!acc[task.category]) acc[task.category] = [];
                  acc[task.category].push(task);
                  return acc;
                }, {}),
              ).map(([category, taskList], index) => (
                <Accordion.Item eventKey={index.toString()} key={category}>
                  <Accordion.Header>{category}</Accordion.Header>
                  <Accordion.Body>
                    <table className="custom-table">
                      <thead>
                        <tr>
                          <th>Oppgave</th>
                          <th>Beskrivelse</th>
                          <th>Video</th>
                          <th>Bilde</th>
                        </tr>
                      </thead>
                      <tbody>
                        {taskList.map((task) => (
                          <tr key={task.id}>
                            <td>
                              {" "}
                              <strong>{task.name}</strong>
                            </td>
                            <td>{task.description}</td>
                            <td>
                              {task.video_url && (
                                <Button
                                  variant="primary"
                                  className="me-2 btn-sm"
                                  onClick={() =>
                                    handleShowVideoModal(task.video_url)
                                  }
                                >
                                  🎥 Se video
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
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          )}
        </div>
      </div>
      <Modal
        show={showVideoModal}
        onHide={() => setShowVideoModal(false)}
        centered
      >
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

      {/* ✅ Modal for Task Images */}
      <Modal
        show={showImageModal}
        onHide={() => setShowImageModal(false)}
        size="lg"
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
        <Link to="/">Back to Levels</Link>
      </p>
    </div>
  );
};

export default TechnicalLevelDetails;
