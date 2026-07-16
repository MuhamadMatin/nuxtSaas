import { requireAuth } from "~~/server/services/better-auth";
import { getRequestURL } from 'h3'

export default defineEventHandler(async (event) =>{
  const protectedUrl = [
    '/api/ai-tools/conversation',
    '/api/ai-tools/code',
    '/api/ai-tools/blog',
    '/api/ai-tools/resume',
    '/api/cloudinary-tools/remove-background',
    '/api/cloudinary-tools/remove-object',
    '/api/user',
  ];

  const pathUrlName = getRequestURL(event).pathname
  const needAuth = protectedUrl.some(p => (pathUrlName === p) || (pathUrlName.startsWith(p + "/")))
  if (needAuth) {
    await requireAuth(event);
  }
})