import slugs from "./slugs.js";
import fm from "front-matter";
import { generateEmbedding } from "./embeddings.js";
import supabase from "./supabase.js";

// Retrieve docs
const parseExpoDocs = async (slug) => {
  const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`; // Fix: added slash
  //console.log(`Fetching URL: ${url}`);
  // Log the URL being fetched

  const response = await fetch(url);
  const content = await response.text();
  const data = fm(content);

  //console.log(`Parsed front matter for ${slug}:`, data.attributes); // Debug log for parsed front matter
  return data;
};

const handleDoc = async (slug) => {
  const data = await parseExpoDocs(slug);

  const vector = await generateEmbedding(data.body);
  const title = data.attributes.title;

  // Save to DB
  const { error } = await supabase
    .from("docs")
    .insert([
      {
        id: slug,
        title,
        url: `https://docs.expo.dev/${slug}`,
        vector,
      },
    ])
    .select();
};

const handleAllDocs = async () => {
  await Promise.all(slugs.map((slug) => handleDoc(slug)));
};

handleAllDocs();
