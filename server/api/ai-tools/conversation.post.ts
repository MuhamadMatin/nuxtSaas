import { incrementLimit } from "~~/server/services/user-limit";
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
      ...messages
    ],
    temperature: 0.5,
    max_completion_tokens: 500
  });

  console.log(event.context.user.id)

  await incrementLimit(event.context.user.id)

  return resp.choices[0]?.message.content
});