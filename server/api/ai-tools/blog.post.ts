import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async (event) => {
  const { blogTopic, blogCategory } = await readBody(event);
  if (!blogTopic) {
    throw createError({
      statusCode: 400,
      statusMessage: "Blog Topic Required"
    });
  }
  if (!blogCategory) {
    throw createError({
      statusCode: 400,
      statusMessage: "Blog Category Required"
    });
  }

  const isPro = await validateUser(event.context.user.id);

  const prompt = `Generate blog title suggestions for the following:
- Topic/Keyword: ${blogTopic}
- Category: ${blogCategory}`

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "system",
        content: `You are an expert blog strategist and headline copywriter. Follow these rules:
          - Generate 10 unique, compelling blog title suggestions based on the given topic and category.
          - Each title should be attention-grabbing, specific, and optimized for click-through rate.
          - Use proven headline formulas: how-to, listicles, questions, data-driven, contrarian, or benefit-focused.
          - Titles should be SEO-friendly (naturally include the keyword without stuffing).
          - Keep titles between 50-70 characters when possible for optimal display in search results.
          - Format output as a numbered markdown list.
          - After the list, briefly explain (1-2 sentences) why the top 3 titles would perform well.
          - Do not use clickbait or misleading titles.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_completion_tokens: 1024
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
});