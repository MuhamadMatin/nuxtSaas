import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async (event) => {
  const { articleTopic, articleLength } = await readBody(event);
  if (!articleTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: "Article Topic Required"
    });
  }

  const isPro = await validateUser(event.context.user.id);

  const wordCount = articleLength || 500;

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "system",
        content: `You are a professional article writer. Follow these rules:
          - Write well-researched, engaging, and informative articles.
          - Structure the article with a clear introduction, body sections with headings, and a conclusion.
          - Use markdown formatting: headings (##, ###), bold for key terms, and bullet/numbered lists where appropriate.
          - Maintain a professional yet accessible tone suitable for a general audience.
          - Include relevant examples, data points, or analogies to support key arguments.
          - Avoid filler content, repetition, and generic statements.
          - Do not fabricate statistics or cite non-existent sources. Use general knowledge only.
          - The article should be approximately ${wordCount} words.`,
      },
      {
        role: "user",
        content: `Write a comprehensive article about: ${articleTopic}`,
      },
    ],
    temperature: 0.7,
    max_completion_tokens: Math.max(wordCount * 3, 2048)
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});