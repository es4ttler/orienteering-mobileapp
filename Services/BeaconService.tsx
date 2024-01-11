import axios from 'axios';

const BASE_URL = 'https://orienteering-backend.onrender.com/beacon';

const BeaconService = {
  checkBeacon: async (data) => {
    try {
    console.log(data);
      const response = await axios.post(`${BASE_URL}/checkBeacon`, data);
      return response.data; // Assuming the server responds with a JSON object
    } catch (error) {
      console.error('Error checking beacon:', error.response.data);
      throw error.response.data;
    }
  },
};

export default BeaconService;
