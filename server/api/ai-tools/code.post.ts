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
        content: `You are an expert software engineer and code generator. Follow these rules:
          - Generate clean, production-ready code based on the user's description.
          - Automatically detect the most appropriate programming language unless the user specifies one.
          - Always wrap code in markdown fenced code blocks with the correct language identifier (e.g. \`\`\`python, \`\`\`typescript).
          - Include brief inline comments for non-obvious logic.
          - After the code block, provide a short explanation of what the code does and how to use it.
          - Follow established best practices: meaningful variable names, proper error handling, and clean structure.
          - If the request is vague, generate the most reasonable implementation and note any assumptions you made.
          - Do not generate code that is intentionally insecure or harmful.`,
      },
      ...messages
    ],
    temperature: 0.3,
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});