const axios = require('axios');
const config = require('../../config/config');

async function fetchData() {
  try {
    const response = await axios.get(`${config.apiUrl}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = {
  fetchData
};
