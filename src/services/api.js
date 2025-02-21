import axios from "axios";

const API_URL =
  "https://3aabe6b2-07df-4a39-9f4c-2d71bcd57212-00-2ol8qq1ivxcvq.worf.repl.co/api";

export const getLevels = async () => {
  try {
    const response = await axios.get(`${API_URL}/levels/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching levels:", error);
    return [];
  }
};

export const getTechnicalLevels = async () => {
  try {
    const response = await axios.get(`${API_URL}/techincalLevels/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching TechincalLevels:", error);
    return [];
  }
};

export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const getTechnicalLevel = async (levelName) => {
  try {
    const response = await axios.get(
      `${API_URL}/technical_levels/${levelName}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching technical level:", error);
    return null;
  }
};

export const getTechnicalLevelTasks = async (technicalLevelName) => {
  try {
    const encodedName = encodeURIComponent(technicalLevelName);
    const response = await axios.get(
      `${API_URL}/technical-level-tasks/${encodedName}/`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching technical level tasks:", error);
    return [];
  }
};

export const getDiagnoses = async (taskId) => {
  try {
    const response = await axios.get(
      `${API_URL}/diagnoses/?technical_level_task=${taskId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching diagnoses:", error);
    return [];
  }
};
