import type { Request } from 'express'

// adicionar propriedade userId ao tipo Request
export type ExtendedRequest = Request & {
  userId?: string
}
