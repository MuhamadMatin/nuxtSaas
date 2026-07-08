import OpenAI from "openai";

const { geminiApi } = useRuntimeConfig();
const openai = new OpenAI({
  apiKey: geminiApi,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export { openai }