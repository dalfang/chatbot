import fm from "front-matter";
// Retrieve docs
export const parseExpoDocs = async (slug) => {
  const url = `https://raw.githubusercontent.com/expo/expo/main/docs/pages/${slug}.mdx`;
  const response = await fetch(url);
  const content = await response.text();
  const data = fm(content);

  //console.log(`Parsed front matter for ${slug}:`, data.attributes); // Debug log for parsed front matter
  return data;
};
