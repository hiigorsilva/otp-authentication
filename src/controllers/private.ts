import type { Response } from 'express'
import { getUserById } from '../services/user'
import type { ExtendedRequest } from '../types/extended-request'

export const test = async (req: ExtendedRequest, res: Response) => {
  // verificar se o usuário está autenticado
  const { userId } = req
  if (!userId) {
    res.status(401).json({ error: 'Acesso não autorizado' })
    return
  }

  // obter o usuário e validar se ele existe
  const user = await getUserById(userId)
  if (!user) {
    res.status(401).json({ error: 'Acesso não autorizado' })
    return
  }

  // retornar os dados do usuário
  res.json({ user })
}
