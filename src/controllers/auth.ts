import type { RequestHandler } from 'express'
import { sendEmail } from '../libs/mailtrap'
import { authSignInSchema } from '../schemas/auth-signin'
import { authSignUpSchema } from '../schemas/auth-signup'
import { generateOTP } from '../services/otp'
import { createUser, getUserByEmail } from '../services/user'

export const signin: RequestHandler = async (req, res) => {
  // validar dados recebidos
  const data = authSignInSchema.safeParse(req.body)
  if (!data.success) {
    res.json({ error: data.error.message })
    return
  }

  // verificar se o usuário existe
  const user = await getUserByEmail(data.data.email)
  if (!user) {
    res.json({ error: 'Usuário não encontrado' })
    return
  }

  // gerar um código OTP para o usuário
  const otp = await generateOTP(user.id)

  // enviar um email com o código OTP para o usuário
  await sendEmail(
    user.email,
    'Código de verificação de login',
    `O seu código de verificação de login é: ${otp.code}.`
  )

  // devolver o ID do código OTP para o usuário
  res.json({ otpId: otp.id })
}

export const signup: RequestHandler = async (req, res) => {
  // validar dados recebidos
  const data = authSignUpSchema.safeParse(req.body)
  if (!data.success) {
    res.json({ error: data.error.message })
    return
  }

  // verificar se o email já existe
  const user = await getUserByEmail(data.data.email)
  if (user) {
    res.json({ error: 'Já existe usuário com este email.' })
    return
  }

  //  criar usuário
  const newUser = await createUser(data.data.name, data.data.email)

  // retornar os dados do usuário criado
  res.status(201).json({ user: newUser })
}
