import { getUserLimit } from "../services/user-limit";

export default defineEventHandler(async (event) => {
  const userLimitCount = await getUserLimit(event.context.user.id)
  return { userLimitCount }
})