import { extractText, getDocumentProxy } from "unpdf";
import { incrementLimit } from "~~/server/services/user-limit";
import { validateUser } from "~~/server/utils/validate-user";

export default defineEventHandler(async (event) => {
  const formData = await readFormData(event);
  const file = formData.get("resume") as File

  if (!file) {
    throw createError({
      statusCode: 400,
      statusMessage: "No resume provided"
    });
  }

  const isPro = await validateUser(event.context.user.id);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });

  const resp = await openai.chat.completions.create({
    model: "gemini-3.5-flash",
    messages: [
      {
        role: "system",
        content: `You are a senior career coach and professional resume reviewer with expertise in hiring practices across industries. Follow these rules:
          - Analyze the resume thoroughly and provide structured, actionable feedback.
          - Use the following format for your review:
            ## Overall Score: X/10
            ## Summary (2-3 sentences about the resume's overall impression)
            ## Strengths (bullet list of what the resume does well)
            ## Areas for Improvement (bullet list with specific, actionable suggestions)
            ## Formatting & Structure (comments on layout, readability, and organization)
            ## ATS Compatibility (whether the resume is likely to pass Applicant Tracking Systems)
            ## Recommended Changes (prioritized list of the top 3-5 changes that would have the biggest impact)
          - Be constructive and encouraging, but honest about weaknesses.
          - Provide specific examples of how to rewrite weak bullet points when possible.
          - Consider modern hiring trends and ATS optimization.
          - Do not make assumptions about the candidate's gender, ethnicity, or background.`,
      },
      {
        role: "user",
        content: `Please review the following resume and provide detailed, constructive feedback:\n\n${text}`,
      },
    ],
    temperature: 0.5,
    max_completion_tokens: 3000
  });

  if (!isPro) {
    await incrementLimit(event.context.user.id)
  }

  return resp.choices[0]?.message.content
})