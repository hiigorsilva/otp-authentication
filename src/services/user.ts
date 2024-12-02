import { db } from '../libs/prisma'

export const getUserByEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
  })
  return user
}

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  })
  return user
}

export const createUser = async (name: string, email: string) => {
  const user = await db.user.create({
    data: {
      name: name,
      email: email,
    },
  })
  return user
}
