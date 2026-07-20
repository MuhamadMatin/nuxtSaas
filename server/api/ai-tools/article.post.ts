import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async(event) => {
  const { articleTopic, articleTopicLength } = await readBody(event);
  if (!articleTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: "Article Topic Required"
    });
  }

  const isPro = await validateUser(event.context.user.id);

  const prompt = `Write an article about ${articleTopic} in ${articleTopicLength ? articleTopicLength : 500} words`

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: articleTopicLength ? articleTopicLength : 5000
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});