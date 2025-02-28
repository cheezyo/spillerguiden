import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import LevelsList from "./components/LevelsList";
import LevelDetails from "./components/LevelDetails";
import TechnicalLevelDetails from "./components/TechnicalLevelDetails";
import TechnicalLevelList from "./components/TechnicalLevelList";
import LandingPage from "./components/LandingPage";
import TaskDetails from "./components/TaskDetails";
import CoachReportForm from "./components/CoachReportForm";
import CoachReportDetails from "./components/CoachReportDetails";
import Parents from "./components/Parents";
import TrainingPlan from "./components/TrainingPlan";
import SessionPlan from "./components/SessionPlan";
import SituationTypeDetails from "./components/SituationTypeDetails";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

const AppLayout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/"; // ✅ Hide Sidebar on Landing Page

  return (
    <div className="app">
      <Header /> {/* ✅ This will now be full-width */}
      <Container fluid className="main-content">
        <Row>
          {!isLandingPage && (
            <Col md={2} className="d-none d-md-block">
              <Sidebar />
            </Col>
          )}
          <Col md={isLandingPage ? 12 : 10}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/levels" element={<LevelsList />} />
              <Route path="/coach-report" element={<CoachReportForm />} />
              <Route path="/level/:id" element={<LevelDetails />} />
              <Route
                path="/technical-level/:name"
                element={<TechnicalLevelDetails />}
              />
              <Route
                path="/technical-levels"
                element={<TechnicalLevelList />}
              />
              <Route
                path="/coach-report-details"
                element={<CoachReportDetails />}
              />
              <Route path="/parents" element={<Parents />} />
              <Route path="/task/:taskId" element={<TaskDetails />} />
              <Route path="/training-plan" element={<TrainingPlan />} />
              <Route path="/session-plan" element={<SessionPlan />} />
              <Route
                path="/situation-type/:situationType"
                element={<SituationTypeDetails />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
