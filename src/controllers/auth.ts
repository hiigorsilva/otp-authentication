import type { RequestHandler } from 'express'
import { authSignInSchema } from '../schemas/auth-signin'
import { getUserByEmail } from '../services/user'

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
  }
}
