export const incrementLimit = async (userId: string) => {
  const userLimit = await prisma.userLimit.findUnique({
    where: { userId }
  })

  if (userLimit) {
    await prisma.userLimit.update({
      where: { userId },
      data: {
        count: userLimit.count + 1
      }
    })
  } else {
    await prisma.userLimit.create({
      data: {
        userId,
        count: 1,
      }
    })
  }
}

export const getUserLimit = async (userId: string) => {
  const user = await prisma.userLimit.findUnique({
    where: { userId }
  })

  if (!user) {
    return 0
  }

  return user.count;
}