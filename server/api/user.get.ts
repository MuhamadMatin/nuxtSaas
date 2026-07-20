import { getCustomerPortalUrl, getPolarCustomerState } from "../services/polar";
import { getUserLimit } from "../services/user-limit";

export default defineEventHandler(async (event) => {
  const userLimitCount = await getUserLimit(event.context.user.id)
  const customerPortalUrl = await getCustomerPortalUrl(event.context.user.id)
  const customerState = await getPolarCustomerState(event.context.user.id);
  const subcription = customerState.activeSubscriptions[0];

  return { userLimitCount, customerPortalUrl, subcription }
})