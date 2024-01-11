import axios from 'axios';

const BASE_URL = 'https://orienteering-backend.onrender.com/log';

const LogService = {
  createLog: async (logData) => {
    try {

      const response = await axios.post(`${BASE_URL}/createLog`, logData);
      return response.data; // Assuming the server responds with a JSON object
    } catch (error) {
      console.error('Error creating log:', error);
      throw error;
    }
  },
};

export default LogService;
