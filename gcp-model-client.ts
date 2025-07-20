const { GoogleAuth } = require('google-auth-library');
const axios = require('axios');
const path = require('path');

class GCPModelClient {
  constructor(options: { projectId: string, region: string, endpointId: string, serviceAccountPath: string }) {
    this.projectId = options.projectId;
    this.region = options.region || 'us-central1';
    this.endpointId = options.endpointId;
    this.serviceAccountPath = options.serviceAccountPath;

    // Initialize Google Auth
    this.auth = new GoogleAuth({
      keyFile: this.serviceAccountPath,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
  }

  /**
   * Get access token for authentication
   */
  async getAccessToken() {
    try {
      const client = await this.auth.getClient();
      const accessTokenResponse = await client.getAccessToken();
      return accessTokenResponse.token;
    } catch (error) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  /**
   * Make prediction request to the deployed model
   * @param {Object|Array} instances - Input data for prediction
   * @param {Object} parameters - Optional parameters for the model
   */
  async predict(instances, parameters = {}) {
    try {
      const accessToken = await this.getAccessToken();

      // Construct the endpoint URL
      const url = `https://${this.region}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.region}/endpoints/${this.endpointId}:predict`;

      // Prepare request payload
      const payload = {
        instances: Array.isArray(instances) ? instances : [instances],
        parameters: parameters
      };

      // Make the API request
      const response = await axios.post(url, payload, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.error?.message || error.response.statusText}`);
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  }

  /**
   * Get endpoint information
   */
  async getEndpointInfo() {
    try {
      const accessToken = await this.getAccessToken();

      const url = `https://${this.region}-aiplatform.googleapis.com/v1/projects/${this.projectId}/locations/${this.region}/endpoints/${this.endpointId}`;

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new Error(`API Error: ${error.response.status} - ${error.response.data.error?.message || error.response.statusText}`);
      } else {
        throw new Error(`Request failed: ${error.message}`);
      }
    }
  }
}

module.exports = GCPModelClient;
