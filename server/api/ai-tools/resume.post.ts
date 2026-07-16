import { extractText, getDocumentProxy } from "unpdf";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("resume") as File

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: "No resume provided"
    });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });

  const prompt = `review the following resume and provide constructive feedback on its strengths, and areas for improvment.
  Resume Content: \n\n${text}`

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 1000
  });

  return resp.choices[0]?.message.content
})