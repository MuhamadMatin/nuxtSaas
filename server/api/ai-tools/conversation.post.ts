import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async (event) => {
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
        content: `You are a knowledgeable and concise AI assistant. Follow these rules:
          - Provide clear, accurate, and well-structured answers.
          - Use markdown formatting when it improves readability (headings, lists, code blocks, bold/italic).
          - If the user's question is ambiguous, ask a brief clarifying question before answering.
          - Stay neutral and objective. Do not express personal opinions or make unsupported claims.
          - When you don't know something, say so honestly rather than guessing.
          - Keep responses focused and avoid unnecessary filler text.`,
      },
      ...messages
    ],
    temperature: 0.7,
    max_completion_tokens: 2048
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});