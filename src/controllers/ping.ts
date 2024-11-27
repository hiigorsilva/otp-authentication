import type { RequestHandler } from 'express'

export const ping: RequestHandler = (_req, res) => {
  res.json({ pong: true })
}
