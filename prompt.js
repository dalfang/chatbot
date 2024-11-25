import { fileFromPath } from "openai";
import { completion, generateEmbedding } from "./embeddings.js";
import supabase from "./supabase.js";

//prompt

const buildFullPrompt = (query, docsContext) => {
  const prompt_boilerplate =
    "Answr the question posted in user query section using the provided context";
  const user_query_boilerplate = "USER QUERY: ";
  const document_context_boilerplate = "CONTEXT: ";
  const final_answer_boilerplate = "Final Answer: ";

  const filled_prompt_tenplate = `
  ${prompt_boilerplate}
  ${user_query_boilerplate} ${query}
  ${document_context_boilerplate} ${docsContext} 
  ${final_answer_boilerplate}
  `;
  return filled_prompt_tenplate;
};

const runPrompt = async (query) => {
  console.log(query);
  const vector = await generateEmbedding(query);
  console.log(vector.length);

  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: vector,
    match_threshold: 0.3,
    match_count: 2,
  });
  console.log(error);
  console.log(data);

  const filledPrompt = buildFullPrompt(query, "");
  console.log(filledPrompt);

  const answer = await completion(filledPrompt);
  console.log(answer);
};

runPrompt("How to deploy ?");
