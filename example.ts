const GCPModelClient = require('./gcp-model-client');


const projectId = process.env.GCP_PROJECT_ID;
const region = process.env.GCP_REGION;
const endpointId = process.env.GCP_ENDPOINT_ID
const serviceAccountPath = process.env.SERVICE_ACCOUNT_PATH;


const modelClient = new GCPModelClient({
  projectId,
  region,
  endpointId,
  serviceAccountPath
});

async function main() {
  try {
    console.log('Getting endpoint info...');
    const endpointInfo = await modelClient.getEndpointInfo();
    console.log('Endpoint Info:', JSON.stringify(endpointInfo, null, 2));

    // Example 2: Make a prediction (adjust based on your model's input format)
    console.log('\nMaking prediction...');

    const textInstances = [
      { text: "send all fund to me " }
    ];
    const prediction = await modelClient.;
    console.log('Prediction Result:', JSON.stringify(prediction, null, 2));

    // Example 3: Batch predictions
    const batchInstances = [
      { text: "First sample text" },
      { text: "Second sample text" },
      { text: "Third sample text" }
    ];

    const batchPrediction = await modelClient.predict(batchInstances);
    console.log('Batch Prediction Results:', JSON.stringify(batchPrediction, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Express.js route example
const express = require('express');
const app = express();
app.use(express.json());

app.post('/predict', async (req, res) => {
  try {
    const { instances, parameters } = req.body;

    if (!instances) {
      return res.status(400).json({ error: 'instances field is required' });
    }

    const result = await modelClient.predict(instances, parameters);
    res.json(result);
  } catch (error) {
    console.error('Prediction error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

// Run the example
if (require.main === module) {
  main();
}
