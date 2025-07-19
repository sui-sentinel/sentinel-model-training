const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GOOGLE_CLOUD_LOCATION = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

console.log({ GEMINI_API_KEY })

async function generateContent(
) {
  const ai = new GoogleGenAI({
    vertexai: true,
    apiKey: GEMINI_API_KEY
  });

  const prompt = `
  User input: I like bagels.
  Answer:
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
    config: {
      systemInstruction: [
        'You are a language translator.',
        'Your mission is to translate text in English to French.',
      ],
    },
  });

  console.log(response.text);

  return response.text;
}

generateContent().then(res => {
  console.log("res", res)
}).catch(error => {
  console.log("error", error)
})
