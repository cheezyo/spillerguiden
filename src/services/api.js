import axios from "axios";

const API_URL =
  "https://3aabe6b2-07df-4a39-9f4c-2d71bcd57212-00-2ol8qq1ivxcvq.worf.replit.dev/api";

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
export const getTacticalTask = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/${taskId}/`);
    console.log(`Fetched Task ${taskId}:`, response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error(`Error fetching task ${taskId}:`, error);
    return null;
  }
};

// ✅ Fetch Tactical Tasks (Taktisk)
export const getTacticalTasks = async (levelId) => {
  try {
    const response = await axios.get(`${API_URL}/tasks/?level=${levelId}`);
    console.log("Tactical tasks fetched:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching tactical tasks:", error);
    return [];
  }
};

export const getMentalTasks = async (levelId) => {
  try {
    const response = await axios.get(
      `${API_URL}/mental_tasks/?level=${levelId}`,
    );
    console.log("Mental tasks fetched:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching mental tasks:", error);
    return [];
  }
};

// ✅ Fetch Physical Tasks (Fysisk)
export const getPhysicalTasks = async (levelId) => {
  try {
    const response = await axios.get(
      `${API_URL}/physical_tasks/?level=${levelId}`,
    );
    console.log("Physical tasks fetched:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching physical tasks:", error);
    return [];
  }
};

export const getDrillsForSituationType = async (situationType, levelId) => {
  try {
    const response = await fetch(
      `${API_URL}/drills/?situation_type=${situationType}&level=${levelId}`,
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching drills for situation type:", error);
    return [];
  }
};

export const getKeyPointsForLevel = async (levelId) => {
  try {
    const response = await fetch(`${API_URL}/key-points/?level=${levelId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching key points for level:", error);
    return [];
  }
};

export const getDrillCountsBySituationType = async (levelId) => {
  try {
    const response = await fetch(`${API_URL}/drill-counts/?level=${levelId}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching drill counts:", error);
    return {};
  }
};

export const getKeyPointsForDrills = async (drillIds, levelId) => {
  if (!drillIds.length) return [];

  try {
    const response = await fetch(
      `${API_URL}/keypoints/filter-by-drills-and-level/?level=${levelId}&drills=${drillIds.join(",")}`,
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching key points for drills:", error);
    return [];
  }
};
