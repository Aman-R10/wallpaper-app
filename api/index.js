import axios from "axios";

const API_KEY = "42512193-515ad41d52f76a03adbb5c412";
const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;  // Updated for images

const formatUrl = (params) => {
  let url = apiUrl + "&per_page=25&safesearch=true&editors_choice=true";
  if (!params) return url;

  let paramKeys = Object.keys(params);
  
  paramKeys.forEach((key) => {
    let value = key === "q" ? encodeURIComponent(params[key]) : params[key];
    url += `&${key}=${value}`;
  });

  // console.log("final url: ", url);
  return url;
};

export const apiCall = async (params) => {
  try {
    const response = await axios.get(formatUrl(params));
    const { data } = response;
    return { success: true, data };
  } catch (err) {
    console.log("got Error: ", err.message);
    return { success: false, msg: err.message };
  }
};
