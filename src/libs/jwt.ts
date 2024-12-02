import type { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../schemas/env'
import type { ExtendedRequest } from '../types/extended-request'

export const createJWT = (id: string) => {
  if (!env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido')
  }
  return jwt.sign({ id }, env.JWT_SECRET)
}

export const verifyJWT = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  // verificar se o header de autorização está presente
  const authHeader = req.headers.authorization
  if (!authHeader) {
    res.status(401).json({ error: 'Acesso não autorizado' })
    return
  }

  // extrair o token de acesso
  const token = authHeader.split(' ')[1] // Bearer <token>

  // verificar o token de acesso
  jwt.verify(token, env.JWT_SECRET, (err, decoded: any) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao verificar token de acesso' })
      return
    }

    // armazenar o ID do usuário no request
    req.userId = decoded.id
    next()
  })
}
