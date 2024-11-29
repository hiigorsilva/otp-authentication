import { v4 as uuid } from 'uuid'
import { db } from '../libs/prisma'

export const generateOTP = async (userId: string) => {
  const otpArray: number[] = Array(6)
    .fill(0)
    .map(() => Math.floor(Math.random() * 10))

  const codeOTP = otpArray.join('')
  const expiresAt = new Date(new Date().getTime() + 30 * 60000)

  const otp = await db.otp.create({
    data: {
      id: uuid(),
      userId: userId,
      code: codeOTP,
      expiredAt: expiresAt,
    },
  })

  return otp
}

export const validateOTP = async (otpId: string, code: string) => {
  const otp = await db.otp.findUnique({
    select: {
      user: true,
    },
    where: {
      id: otpId,
      code: code,
      used: false,
      expiredAt: {
        gte: new Date(),
      },
    },
  })

  if (otp && otp.user) {
    await db.otp.update({
      where: { id: otpId },
      data: { used: true },
    })
    return otp.user
  }

  return false
}
