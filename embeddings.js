import { config } from "dotenv";
config();
import { OpenAI } from "openai";

// Instantiate the OpenAI client with the API key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateEmbedding = async (input) => {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input,
    encoding_format: "float",
  });

  const vector = embedding.data[0].embedding;
  return vector;
};

export const completion = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0];
};
