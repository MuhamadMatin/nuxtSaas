import { incrementLimit } from "~~/server/services/user-limit";
import { openai } from "~~/server/utils/openai";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async(event) => {
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

  const prompt = `generate a blog title for ${blogTopic} in category ${blogCategory}`

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 200
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }
  
  return resp.choices[0]?.message.content
});