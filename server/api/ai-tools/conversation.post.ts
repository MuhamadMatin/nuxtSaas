import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async(event) => {
  const { messages } = await readBody(event);
  if (!messages) {
    throw createError({
      statusCode: 400,
      statusMessage: "Message required"
    });
  }

  const isPro = await validateUser(event.context.user.id);

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

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});