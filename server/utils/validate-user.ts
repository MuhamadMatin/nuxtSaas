import { MAX_FREE_GENERATE } from '~/utils/utils/user-limit';
import { getPolarCustomerState } from "~~/server/services/polar";

const getUserFreeTrial = async (userId: string) => {
  const userLimit = await prisma.userLimit.findUnique({
    where: {
      userId,
    }
  });

  if (!userLimit || userLimit.count < MAX_FREE_GENERATE) {
    return true;
  }

  return false;
}

const getUserProStatus = async (userId: string) => {
  const user = await getPolarCustomerState(userId);
  return !!user.activeSubscriptions[0]
}

export const validateUser = async (userId: string) => {
  const isFreeTrialExist = await getUserFreeTrial(userId);
  const isPro = await getUserProStatus(userId);

  if (!isPro && !isFreeTrialExist) {
    throw createError({
      statusCode: 403,
      statusMessage: "Free trial has expired, please upgrade to Pro"
    });
  }

  return isPro
}