import { openai } from "~~/server/utils/openai";

export default defineEventHandler(async(event) => {
  const { messages } = await readBody(event);
  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message required"
    });
  }

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "system",
        content: "You are helpfull asistant.",
      },
      {
        role: "user",
        content: messages,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 500
  });

  return resp.choices[0]?.message.content
});