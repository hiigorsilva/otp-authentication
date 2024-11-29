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
